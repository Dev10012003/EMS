import { plainToInstance } from "class-transformer";
import { EmployeeSalaryResponseDTO, SalaryResponseDTO, } from "../dTOs/response/salaryResponseDTO.js";
import { salaryRepository } from "../repositories/salaryRepository.js";
import { employeeRepository } from "../repositories/employeeRepository.js";
import moment from "moment";
import { countBusinessDays } from "../utils/businessDays.js";
import mongoose from "mongoose";
import { leaveRepository } from "../repositories/leaveRepository.js";
import { currentYear } from "../utils/constant.js";
export class SalaryService {
    async getSalaries(dto) {
        const { id, role, currentPage, limit, orderBy = "payDate", orderDirection = "asc", } = dto;
        let employeeId = id;
        if (role === "employee") {
            const employee = await employeeRepository.findByUserId(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            employeeId = employee._id.toString();
        }
        const pageNumber = parseInt(currentPage || "1", 10) || 1;
        const pageSize = parseInt(limit || "10", 10) || 10;
        const { data, totalRecords } = await salaryRepository.getAll(employeeId, role, pageNumber, pageSize, orderBy, orderDirection);
        const salaries = plainToInstance(SalaryResponseDTO, {
            employeeSalaries: plainToInstance(EmployeeSalaryResponseDTO, data),
            totalRecords,
        });
        return salaries;
    }
    async getSalaryPDF(id) {
        const salaryData = await salaryRepository.findSalaryById(id);
        if (!salaryData) {
            throw new Error("Salary not found.");
        }
        return salaryData;
    }
    async getByEmployeeId(id) {
        const salaryDetail = await salaryRepository.findByEmployeeId(id);
        return salaryDetail;
    }
    async getSalaryDetail(id) {
        const employee = await employeeRepository.findByUserId(id);
        if (!employee) {
            throw new Error("Employee not found");
        }
        const salaryDetail = await salaryRepository.findSalaryDetail(employee._id.toString());
        return salaryDetail;
    }
    async updateStatus(id) {
        const salary = await salaryRepository.findById(id);
        if (!salary) {
            throw new Error("Salary not found.");
        }
        await salaryRepository.updateStatus(id);
    }
    async add(dto) {
        const { employeeId, basicSalary, allowances, deductions, payDate } = dto;
        const prevMonthStart = moment
            .utc(payDate)
            .subtract(1, "month")
            .startOf("month");
        const prevMonthEnd = moment
            .utc(payDate)
            .subtract(1, "month")
            .endOf("month");
        const workingDays = moment(prevMonthStart).businessDiff(moment(prevMonthEnd));
        const leaves = await leaveRepository.findApprovedLeaves(employeeId, prevMonthStart.toDate(), prevMonthEnd.toDate());
        const totalLeaves = leaves.reduce((count, leave) => {
            const leaveStart = moment.max(moment(leave.startDate), prevMonthStart);
            const leaveEnd = moment.min(moment(leave.endDate), prevMonthEnd);
            return count + countBusinessDays(leaveStart, leaveEnd);
        }, 0);
        const perDaySalary = basicSalary / workingDays;
        const excessLeaves = Math.max(0, totalLeaves - 2);
        const leaveDeduction = parseFloat((excessLeaves * perDaySalary).toFixed(2));
        const netSalary = parseFloat((basicSalary + allowances - deductions - leaveDeduction).toFixed(2));
        const employeeObjectId = new mongoose.Types.ObjectId(employeeId);
        await salaryRepository.create({
            employeeId: employeeObjectId,
            basicSalary,
            allowances,
            deductions,
            netSalary,
            leaveDays: excessLeaves,
            leaveDeduction,
            paidLeavesUsed: Math.min(totalLeaves, 2),
            carryForwardLeaves: totalLeaves < 2 ? 2 - totalLeaves : 0,
            payDate,
        });
        await employeeRepository.updateSalary(employeeId, basicSalary + allowances - deductions);
    }
    async processSalaries() {
        const employees = await employeeRepository.findAll();
        const payDate = moment.utc().startOf("month");
        const prevMonthStart = moment(payDate)
            .subtract(1, "month")
            .startOf("month");
        const prevMonthEnd = moment(payDate).subtract(1, "month").endOf("month");
        for (const employee of employees) {
            const latestSalary = await salaryRepository.findLatestSalary(employee._id.toString(), currentYear);
            if (!latestSalary) {
                console.log(`Skipping Employee ID ${employee._id}: No previous salary found.`);
                continue;
            }
            const { basicSalary, allowances, deductions, carryForwardLeaves } = latestSalary;
            const workingDays = moment(prevMonthStart).businessDiff(moment(prevMonthEnd));
            const leaves = await leaveRepository.findApprovedLeaves(employee._id.toString(), prevMonthStart.toDate(), prevMonthEnd.toDate());
            const totalLeaves = leaves.reduce((count, leave) => {
                const leaveStart = moment.max(moment(leave.startDate), prevMonthStart);
                const leaveEnd = moment.min(moment(leave.endDate), prevMonthEnd);
                return count + countBusinessDays(leaveStart, leaveEnd);
            }, 0);
            const perDaySalary = basicSalary / workingDays;
            const availablePaidLeaves = 2 + carryForwardLeaves;
            const usedPaidLeaves = Math.min(totalLeaves, availablePaidLeaves);
            const excessLeaves = Math.max(0, totalLeaves - usedPaidLeaves);
            const leaveDeduction = parseFloat((excessLeaves * perDaySalary).toFixed(2));
            const netSalary = parseFloat((basicSalary + allowances - deductions - leaveDeduction).toFixed(2));
            const newCarryForwardLeaves = availablePaidLeaves > totalLeaves
                ? availablePaidLeaves - totalLeaves
                : 0;
            await salaryRepository.create({
                employeeId: employee._id,
                basicSalary,
                allowances,
                deductions,
                netSalary,
                leaveDays: excessLeaves,
                leaveDeduction,
                paidLeavesUsed: usedPaidLeaves,
                carryForwardLeaves: newCarryForwardLeaves,
                payDate: payDate.toDate(),
            });
            console.log(`Salary processed for Employee ID: ${employee._id}`);
        }
    }
}
export const salaryService = new SalaryService();
//# sourceMappingURL=salaryService.js.map
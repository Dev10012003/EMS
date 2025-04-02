import mongoose from "mongoose";
import Salary from "../models/salary.js";
import { currentYear } from "../utils/constant.js";
export class SalaryRepository {
    async getAll(employeeId, role, pageNumber = 1, pageSize = 10, orderBy, orderDirection) {
        const sortOrder = orderDirection === "desc" ? -1 : 1;
        const sortObj = {
            [orderBy]: sortOrder,
        };
        const skip = (pageNumber - 1) * pageSize;
        const matchCondition = {
            employeeId: new mongoose.Types.ObjectId(employeeId),
        };
        if (role === "employee") {
            matchCondition.status = "Paid";
        }
        const result = await Salary.aggregate([
            { $match: matchCondition },
            {
                $facet: {
                    metadata: [{ $count: "totalRecords" }],
                    data: [
                        { $skip: skip },
                        { $limit: pageSize },
                        {
                            $lookup: {
                                from: "employees",
                                localField: "employeeId",
                                foreignField: "_id",
                                as: "employee",
                            },
                        },
                        { $unwind: "$employee" },
                        { $sort: sortObj },
                        {
                            $project: {
                                employeeId: "$employee.employeeId",
                                basicSalary: 1,
                                allowances: 1,
                                deductions: 1,
                                netSalary: 1,
                                leaveDays: 1,
                                leaveDeduction: 1,
                                payDate: 1,
                                status: 1,
                                paidLeavesUsed: 1,
                                carryForwardLeaves: 1,
                            },
                        },
                    ],
                },
            },
        ]);
        const totalRecords = result[0].metadata.length > 0 ? result[0].metadata[0].totalRecords : 0;
        return {
            data: result[0].data,
            totalRecords,
        };
    }
    async findSalaryById(id) {
        const salary = await Salary.findById(id).populate({
            path: "employeeId",
            select: "employeeId userId department",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name email profileImage role" },
            ],
        });
        if (!salary)
            return null;
        const employee = salary.employeeId;
        const user = employee?.userId;
        const department = employee?.department;
        const salaryDTO = {
            employeeId: {
                _id: employee?._id ?? null,
                employeeId: employee?.employeeId ?? "",
                userId: {
                    _id: user?._id ?? null,
                    name: user?.name ?? "",
                    email: user?.email ?? "",
                },
                department: {
                    _id: department?._id ?? null,
                    dep_name: department?.dep_name ?? "",
                },
            },
            basicSalary: salary.basicSalary,
            allowances: salary.allowances,
            deductions: salary.deductions,
            leaveDays: salary.leaveDays,
            leaveDeduction: salary.leaveDeduction,
            paidLeavesUsed: salary.paidLeavesUsed,
            carryForwardLeaves: salary.carryForwardLeaves,
            netSalary: salary.netSalary,
            payDate: salary.payDate,
        };
        return salaryDTO;
    }
    async findByEmployeeId(id) {
        return await Salary.findOne({ employeeId: id });
    }
    async findSalaryDetail(employeeId) {
        const salaryDetail = await Salary.findOne({
            employeeId: employeeId,
            payDate: {
                $gte: new Date(`${currentYear}-01-02`),
                $lte: new Date(`${currentYear}-12-31`),
            },
        })
            .sort({ payDate: -1 })
            .select("basicSalary allowances deductions")
            .lean();
        if (salaryDetail) {
            salaryDetail.netSalary =
                (salaryDetail.basicSalary || 0) +
                    (salaryDetail.allowances || 0) -
                    (salaryDetail.deductions || 0);
            salaryDetail.deductions = (salaryDetail.deductions || 0) - 200;
        }
        return salaryDetail;
    }
    async findById(id) {
        return await Salary.findById(id);
    }
    async updateStatus(id) {
        return await Salary.findByIdAndUpdate({ _id: id }, { status: "Paid", updatedAt: Date.now() });
    }
    async create(salaryData) {
        return await Salary.create(salaryData);
    }
    async findLatestSalary(employeeId, year) {
        return await Salary.findOne({
            employeeId,
            payDate: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
            },
        }).sort({ payDate: -1 });
    }
}
export const salaryRepository = new SalaryRepository();
//# sourceMappingURL=salaryRepository.js.map
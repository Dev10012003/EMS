import mongoose from "mongoose";
import { SalaryDTO } from "../dTOs/response/salaryPdfResponseDTO.js";
import { ISalary } from "../interfaces/salary.js";
import Salary from "../models/salary.js";
import { currentYear } from "../utils/constant.js";

export class SalaryRepository {
  async getAll(
    employeeId: string,
    role: string,
    pageNumber: number = 1,
    pageSize: number = 10,
    orderBy: string,
    orderDirection: "asc" | "desc"
  ): Promise<{ data: ISalary[]; totalRecords: number }> {
    const sortOrder: 1 | -1 = orderDirection === "desc" ? -1 : 1;
    const sortObj: Record<string, 1 | -1> = {
      [orderBy]: sortOrder,
    };
    const skip = (pageNumber - 1) * pageSize;
    const matchCondition: any = {
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

    const totalRecords =
      result[0].metadata.length > 0 ? result[0].metadata[0].totalRecords : 0;

    return {
      data: result[0].data,
      totalRecords,
    };
  }

  async findSalaryById(id: string): Promise<SalaryDTO | null> {
    const salary = await Salary.findById(id).populate({
      path: "employeeId",
      select: "employeeId userId department",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name email profileImage role" },
      ],
    });

    if (!salary) return null;

    const employee = salary.employeeId as any;
    const user = employee?.userId as any;
    const department = employee?.department as any;

    const salaryDTO: SalaryDTO = {
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

  async findByEmployeeId(id: string): Promise<ISalary | null> {
    return await Salary.findOne({ employeeId: id });
  }

  async findSalaryDetail(employeeId: string): Promise<ISalary | null> {
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

  async findById(id: string) {
    return await Salary.findById(id);
  }

  async updateStatus(id: string) {
    return await Salary.findByIdAndUpdate(
      { _id: id },
      { status: "Paid", updatedAt: Date.now() }
    );
  }

  async create(salaryData: Partial<ISalary>): Promise<ISalary> {
    return await Salary.create(salaryData);
  }

  async findLatestSalary(
    employeeId: string,
    year: number
  ): Promise<ISalary | null> {
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

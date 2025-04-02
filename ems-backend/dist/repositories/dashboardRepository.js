import Leave from "../models/leave.js";
import Department from "../models/department.js";
import Employee from "../models/employee.js";
import { currentMonth, currentYear, holidays } from "../utils/constant.js";
import Salary from "../models/salary.js";
import mongoose from "mongoose";
export class SummaryRepository {
    async getTotalEmployees() {
        return await Employee.countDocuments();
    }
    async getTotalDepartments() {
        return await Department.countDocuments();
    }
    async getTotalSalaries() {
        const result = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
        ]);
        return result[0]?.totalSalary || 0;
    }
    async getLeaveSummary() {
        return await Leave.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$startDate" }, currentMonth] },
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employeeDetails",
                },
            },
            { $unwind: "$employeeDetails" },
            {
                $group: {
                    _id: "$status",
                    records: {
                        $push: {
                            employeeId: "$employeeDetails.employeeId",
                            leaveType: "$leaveType",
                            reason: "$reason",
                            days: {
                                $let: {
                                    vars: {
                                        start: { $toDate: "$startDate" },
                                        end: { $toDate: "$endDate" },
                                        holidays: holidays,
                                    },
                                    in: {
                                        $subtract: [
                                            {
                                                $add: [
                                                    {
                                                        $dateDiff: {
                                                            startDate: "$$start",
                                                            endDate: "$$end",
                                                            unit: "day",
                                                        },
                                                    },
                                                    1,
                                                ],
                                            },
                                            {
                                                $add: [
                                                    {
                                                        $multiply: [
                                                            {
                                                                $add: [
                                                                    {
                                                                        $floor: {
                                                                            $divide: [
                                                                                {
                                                                                    $dateDiff: {
                                                                                        startDate: "$$start",
                                                                                        endDate: "$$end",
                                                                                        unit: "day",
                                                                                    },
                                                                                },
                                                                                7,
                                                                            ],
                                                                        },
                                                                    },
                                                                    {
                                                                        $cond: [
                                                                            { $lte: [{ $dayOfWeek: "$$end" }, 1] },
                                                                            1,
                                                                            0,
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                            2,
                                                        ],
                                                    },
                                                    {
                                                        $cond: [
                                                            { $eq: [{ $dayOfWeek: "$$end" }, 7] },
                                                            1,
                                                            0,
                                                        ],
                                                    },
                                                    {
                                                        $size: {
                                                            $filter: {
                                                                input: "$$holidays",
                                                                as: "holiday",
                                                                cond: {
                                                                    $and: [
                                                                        { $gte: ["$$holiday", "$$start"] },
                                                                        { $lte: ["$$holiday", "$$end"] },
                                                                        { $ne: [{ $dayOfWeek: "$$holiday" }, 1] },
                                                                        { $ne: [{ $dayOfWeek: "$$holiday" }, 7] },
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        ]);
    }
    async getSalarySummary() {
        return await Salary.aggregate([
            {
                $match: {
                    status: "Pending",
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$payDate" }, currentYear] },
                            { $eq: [{ $month: "$payDate" }, currentMonth] },
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employee",
                },
            },
            { $unwind: "$employee" },
            {
                $group: {
                    _id: null,
                    salaryData: {
                        $push: {
                            employeeId: "$employee.employeeId",
                            payDate: {
                                $dateToString: { format: "%d-%m-%Y", date: "$payDate" },
                            },
                            status: "$status",
                        },
                    },
                },
            },
        ]);
    }
    async getEmployeeSummary(id) {
        return await Employee.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: "salaries",
                    localField: "_id",
                    foreignField: "employeeId",
                    pipeline: [
                        {
                            $addFields: {
                                payDatePrevMonth: {
                                    $dateSubtract: {
                                        startDate: "$payDate",
                                        unit: "month",
                                        amount: 1,
                                    },
                                },
                            },
                        },
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Paid"] },
                                        {
                                            $eq: [
                                                { $year: "$payDatePrevMonth" },
                                                { $year: new Date() },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                netSalary: 1,
                                month: {
                                    $dateToString: { format: "%b", date: "$payDatePrevMonth" },
                                },
                            },
                        },
                    ],
                    as: "salaryData",
                },
            },
            {
                $lookup: {
                    from: "leaves",
                    localField: "_id",
                    foreignField: "employeeId",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: [{ $month: "$startDate" }, currentMonth] },
                                        { $eq: [{ $month: "$endDate" }, currentMonth] },
                                    ],
                                },
                            },
                        },
                        {
                            $group: {
                                _id: { status: "$status", leaveType: "$leaveType" },
                                count: { $sum: 1 },
                            },
                        },
                        {
                            $project: {
                                status: "$_id.status",
                                leaveType: "$_id.leaveType",
                                count: 1,
                                _id: 0,
                            },
                        },
                    ],
                    as: "leaveData",
                },
            },
            {
                $project: {
                    salaryData: 1,
                    leaveData: 1,
                },
            },
        ]);
    }
}
export const summaryRepository = new SummaryRepository();
//# sourceMappingURL=dashboardRepository.js.map
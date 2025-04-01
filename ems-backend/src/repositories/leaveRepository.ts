import mongoose from "mongoose";
import { UpdateLeaveStatusRequestDTO } from "../dTOs/request/updateLeaveStatusRequestDTO.js";
import { ILeave } from "../interfaces/leave.js";
import Leave from "../models/leave.js";
import { holidays } from "../utils/constant.js";

export class LeaveRepository {
  async create(leaveData: Partial<ILeave>): Promise<ILeave> {
    const leave = new Leave(leaveData);
    return await leave.save();
  }

  async getAll(): Promise<ILeave[]> {
    return await Leave.aggregate([
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
        $lookup: {
          from: "departments",
          localField: "employee.department",
          foreignField: "_id",
          as: "department",
        },
      },
      { $unwind: "$department" },
      {
        $lookup: {
          from: "users",
          localField: "employee.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $addFields: {
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
                        $cond: [{ $eq: [{ $dayOfWeek: "$$end" }, 7] }, 1, 0],
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
      {
        $project: {
          _id: 1,
          employeeId: "$employee.employeeId",
          name: "$user.name",
          leaveType: 1,
          dep_name: "$department.dep_name",
          status: 1,
          days: 1,
        },
      },
    ]);
  }

  async getByEmployeeId(
    empId: string,
    status?: string,
    pageNumber: number = 1,
    pageSize: number = 10,
    orderBy: string = "appliedAt",
    orderDirection: string = "asc"
  ): Promise<{ leaves: ILeave[]; totalRecords: number }> {
    const matchCondition: any = {
      employeeId: new mongoose.Types.ObjectId(empId),
    };
    if (status) matchCondition.status = status;
    const skip = (pageNumber - 1) * pageSize;
    const sortOrder: 1 | -1 = orderDirection === "desc" ? -1 : 1;
    const sortObj: Record<string, 1 | -1> = {
      [orderBy]: sortOrder,
    };
    const leavesAggregation = await Leave.aggregate([
      { $match: matchCondition },
      { $sort: sortObj },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: pageSize }],
        },
      },
    ]);
    const leaves = leavesAggregation[0]?.data || [];
    const totalRecords = leavesAggregation[0]?.metadata[0]?.total || 0;
    return { leaves, totalRecords };
  }

  async findById(id: string): Promise<ILeave | null> {
    return await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name profileImage" },
      ],
    });
  }

  async updateStatus(dto: UpdateLeaveStatusRequestDTO): Promise<ILeave | null> {
    const { id, status } = dto;
    return await Leave.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
  }

  async findApprovedLeaves(
    employeeId: string,
    start: Date,
    end: Date
  ): Promise<ILeave[]> {
    return await Leave.find({
      employeeId,
      status: "Approved",
      startDate: { $lte: end },
      endDate: { $gte: start },
    });
  }
}

export const leaveRepository = new LeaveRepository();

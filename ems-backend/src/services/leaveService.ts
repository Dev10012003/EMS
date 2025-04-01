import { plainToInstance } from "class-transformer";
import mongoose from "mongoose";
import { AddLeaveRequestDTO } from "../dTOs/request/addLeaveRequestDTO.js";
import { GetLeaveRequestDTO } from "../dTOs/request/getLeaveRequestDTO.js";
import { UpdateLeaveStatusRequestDTO } from "../dTOs/request/updateLeaveStatusRequestDTO.js";
import { LeaveResponseDTO } from "../dTOs/response/leaveResponseDTO.js";
import { ILeave } from "../interfaces/leave.js";
import { employeeRepository } from "../repositories/employeeRepository.js";
import { leaveRepository } from "../repositories/leaveRepository.js";

export class LeaveService {
  async add(dto: AddLeaveRequestDTO) {
    const employee = await employeeRepository.findByUserId(dto.userId);
    if (!employee) {
      throw new Error("Employee not found.");
    }
    await leaveRepository.create({
      employeeId: employee._id as mongoose.Types.ObjectId,
      leaveType: dto.leaveType,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      reason: dto.reason,
    });
  }

  async getAll(): Promise<ILeave[]> {
    return await leaveRepository.getAll();
  }

  async getByEmployeeId(dto: GetLeaveRequestDTO): Promise<LeaveResponseDTO> {
    let empId = dto.id;

    if (dto.role === "employee") {
      const employee = await employeeRepository.findByUserId(dto.id);
      if (!employee) {
        throw new Error("Employee not found");
      }
      empId = employee._id.toString();
    }
    const pageNumber = parseInt(dto.currentPage || "1", 10) || 1;
    const pageSize = parseInt(dto.limit || "10", 10) || 10;

    const { leaves, totalRecords } = await leaveRepository.getByEmployeeId(
      empId,
      dto.status,
      pageNumber,
      pageSize,
      dto.orderBy || "appliedAt",
      dto.orderDirection || "asc"
    );

    return plainToInstance(LeaveResponseDTO, {
      leaves,
      totalRecords,
    });
  }

  async getById(id: string): Promise<ILeave | null> {
    return await leaveRepository.findById(id);
  }

  async updateStatus(dto: UpdateLeaveStatusRequestDTO): Promise<boolean> {
    const leave = await leaveRepository.findById(dto.id);
    if (!leave) return false;
    await leaveRepository.updateStatus(dto);
    return true;
  }
}

export const leaveService = new LeaveService();

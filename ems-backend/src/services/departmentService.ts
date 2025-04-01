import { plainToInstance } from "class-transformer";
import { AddDepartmentRequestDTO } from "../dTOs/request/addDepartmentRequestDTO.js";
import { UpdateDepartmentRequestDTO } from "../dTOs/request/updateDepartmentRequestDTO.js";
import { DepartmentResponseDTO } from "../dTOs/response/departmentResponseDTO.js";
import { IDepartment } from "../interfaces/department.js";
import { departmentRepository } from "../repositories/departmentRepository.js";

export class DepartmentService {
  async getAll(): Promise<IDepartment[]> {
    return await departmentRepository.getAll();
  }

  async add(dto: AddDepartmentRequestDTO) {
    const { dep_name, description } = dto;
    await departmentRepository.create(dep_name, description);
  }

  async getById(id: string): Promise<DepartmentResponseDTO | null> {
    const department = await departmentRepository.getById(id);
    if (!department) return null;
    return plainToInstance(DepartmentResponseDTO, department.toObject());
  }

  async update(dto: UpdateDepartmentRequestDTO): Promise<boolean> {
    const department = await departmentRepository.getById(dto.id);
    if (!department) return false;
    await departmentRepository.update(dto);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const department = await departmentRepository.getById(id);
    if (!department) return false;
    await departmentRepository.delete(id);
    return true;
  }
}

export const departmentService = new DepartmentService();

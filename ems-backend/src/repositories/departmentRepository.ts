import Department from "../models/department.js";
import { IDepartment } from "../interfaces/department.js";
import { UpdateDepartmentRequestDTO } from "../dTOs/request/updateDepartmentRequestDTO.js";

export class DepartmentRepository {
  async getAll(): Promise<IDepartment[]> {
    return await Department.find();
  }

  async create(dep_name: string, description?: string): Promise<IDepartment> {
    const newDepartment = new Department({
      dep_name,
      description,
    });
    return await newDepartment.save();
  }

  async getById(id: string): Promise<IDepartment | null> {
    return await Department.findById(id);
  }

  async update(dto: UpdateDepartmentRequestDTO): Promise<void> {
    const { id, dep_name, description } = dto;
    await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );
  }

  async delete(id: string): Promise<void> {
    const department = await this.getById(id);
    if (department) {
      await department.deleteOne();
    }
  }
}

export const departmentRepository = new DepartmentRepository();

import Employee from "../models/employee.js";
import { IEmployee } from "../interfaces/employee.js";
import { GetEmployeeRequestDTO } from "../dTOs/request/getEmployeeRequestDTO.js";

export class EmployeeRepository {
  async create(employeeData: Partial<IEmployee>): Promise<IEmployee> {
    const newEmployee = new Employee(employeeData);
    return await newEmployee.save();
  }

  async getAll(): Promise<IEmployee[]> {
    return Employee.find()
      .populate({
        path: "userId",
        select: "-password",
        match: { role: "employee" },
      })
      .populate("department")
      .sort({ createdAt: 1 })
      .exec();
  }

  async getById(dto: GetEmployeeRequestDTO): Promise<IEmployee | null> {
    const { role, id } = dto;
    const query = role === "admin" ? { _id: id } : { userId: id };

    return Employee.findOne(query)
      .populate("userId", { password: 0 })
      .populate("department")
      .exec();
  }

  async findById(id: string): Promise<IEmployee | null> {
    return Employee.findById(id);
  }

  async update(id: string, data: Partial<IEmployee>): Promise<void> {
    await Employee.findByIdAndUpdate(id, data);
  }

  async getByDepartment(id: string): Promise<IEmployee[]> {
    return await Employee.find({ department: id })
      .populate("userId", { password: 0 })
      .populate("department");
  }

  async delete(id: string): Promise<void> {
    const employee = await this.findById(id);
    if (employee) {
      await employee.deleteOne();
    }
  }

  async findByUserId(id: string): Promise<IEmployee | null> {
    return Employee.findOne({ userId: id });
  }

  async findAll(): Promise<IEmployee[]> {
    return await Employee.find();
  }

  async updateSalary(employeeId: string, updatedSalary: number): Promise<void> {
    await Employee.findByIdAndUpdate(employeeId, { salary: updatedSalary });
  }
}

export const employeeRepository = new EmployeeRepository();

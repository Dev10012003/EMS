import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import mongoose from "mongoose";
import { employeeRepository } from "../repositories/employeeRepository.js";
export class EmployeeService {
    async add(dto) {
        const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role, image, } = dto;
        const existingUser = await authRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists!");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await authRepository.create({
            name,
            email,
            password: hashedPassword,
            role: role,
            profileImage: image,
        });
        const userId = new mongoose.Types.ObjectId(newUser._id);
        const departmentId = new mongoose.Types.ObjectId(department);
        await employeeRepository.create({
            userId: userId,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department: departmentId,
            salary,
        });
    }
    async getAll() {
        return await employeeRepository.getAll();
    }
    async getById(dto) {
        return await employeeRepository.getById(dto);
    }
    async update(dto) {
        const { id, name, dob, gender, maritalStatus, designation, department, role, image, } = dto;
        const employee = await employeeRepository.findById(id);
        if (!employee)
            throw { status: 404, message: "Employee not found!" };
        const userId = new mongoose.Types.ObjectId(employee.userId);
        const departmentId = new mongoose.Types.ObjectId(department);
        const user = await authRepository.findById(userId.toString());
        if (!user)
            throw { status: 404, message: "User not found!" };
        await authRepository.update(user._id.toString(), {
            name,
            role: role,
            ...(image && { profileImage: image }),
        });
        await employeeRepository.update(id, {
            maritalStatus,
            department: departmentId,
            designation,
            gender,
            dob,
        });
    }
    async getByDepartment(id) {
        return await employeeRepository.getByDepartment(id);
    }
    async delete(id) {
        const employee = await employeeRepository.findById(id);
        if (!employee)
            return false;
        await employeeRepository.delete(id);
        return true;
    }
}
export const employeeService = new EmployeeService();
//# sourceMappingURL=employeeService.js.map
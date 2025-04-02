import Employee from "../models/employee.js";
export class EmployeeRepository {
    async create(employeeData) {
        const newEmployee = new Employee(employeeData);
        return await newEmployee.save();
    }
    async getAll() {
        return Employee.find()
            .populate({
            path: "userId",
            select: "-password",
            match: { role: "employee" },
        })
            .populate("department")
            .exec();
    }
    async getById(dto) {
        const { role, id } = dto;
        const query = role === "admin" ? { _id: id } : { userId: id };
        return Employee.findOne(query)
            .populate("userId", { password: 0 })
            .populate("department")
            .exec();
    }
    async findById(id) {
        return Employee.findById(id);
    }
    async update(id, data) {
        await Employee.findByIdAndUpdate(id, data);
    }
    async getByDepartment(id) {
        return await Employee.find({ department: id })
            .populate("userId", { password: 0 })
            .populate("department");
    }
    async delete(id) {
        const employee = await this.findById(id);
        if (employee) {
            await employee.deleteOne();
        }
    }
    async findByUserId(id) {
        return Employee.findOne({ userId: id });
    }
    async findAll() {
        return await Employee.find();
    }
    async updateSalary(employeeId, updatedSalary) {
        await Employee.findByIdAndUpdate(employeeId, { salary: updatedSalary });
    }
}
export const employeeRepository = new EmployeeRepository();
//# sourceMappingURL=employeeRepository.js.map
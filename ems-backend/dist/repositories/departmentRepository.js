import Department from "../models/department.js";
export class DepartmentRepository {
    async getAll() {
        return await Department.find();
    }
    async create(dep_name, description) {
        const newDepartment = new Department({
            dep_name,
            description,
        });
        return await newDepartment.save();
    }
    async getById(id) {
        return await Department.findById(id);
    }
    async update(dto) {
        const { id, dep_name, description } = dto;
        await Department.findByIdAndUpdate(id, { dep_name, description }, { new: true });
    }
    async delete(id) {
        const department = await this.getById(id);
        if (department) {
            await department.deleteOne();
        }
    }
}
export const departmentRepository = new DepartmentRepository();
//# sourceMappingURL=departmentRepository.js.map
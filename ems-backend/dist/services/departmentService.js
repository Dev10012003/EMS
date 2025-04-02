import { plainToInstance } from "class-transformer";
import { DepartmentResponseDTO } from "../dTOs/response/departmentResponseDTO.js";
import { departmentRepository } from "../repositories/departmentRepository.js";
export class DepartmentService {
    async getAll() {
        return await departmentRepository.getAll();
    }
    async add(dto) {
        const { dep_name, description } = dto;
        await departmentRepository.create(dep_name, description);
    }
    async getById(id) {
        const department = await departmentRepository.getById(id);
        if (!department)
            return null;
        return plainToInstance(DepartmentResponseDTO, department.toObject());
    }
    async update(dto) {
        const department = await departmentRepository.getById(dto.id);
        if (!department)
            return false;
        await departmentRepository.update(dto);
        return true;
    }
    async delete(id) {
        const department = await departmentRepository.getById(id);
        if (!department)
            return false;
        await departmentRepository.delete(id);
        return true;
    }
}
export const departmentService = new DepartmentService();
//# sourceMappingURL=departmentService.js.map
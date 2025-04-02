import { plainToInstance } from "class-transformer";
import { AddEmployeeRequestDTO } from "../dTOs/request/addEmployeeRequestDTO.js";
import { GetEmployeeRequestDTO } from "../dTOs/request/getEmployeeRequestDTO.js";
import { UpdateEmployeeRequestDTO } from "../dTOs/request/updateEmployeeRequestDTO.js";
import { employeeService } from "../services/employeeService.js";
export const add = async (req, res) => {
    try {
        const dto = plainToInstance(AddEmployeeRequestDTO, {
            ...req.body,
            image: req.file ? req.file.filename : "",
        });
        await employeeService.add(dto);
        res
            .status(201)
            .json({ success: true, message: "Employee Created Successfully." });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getAll = async (req, res) => {
    try {
        const employees = await employeeService.getAll();
        res.status(200).json({ success: true, employees });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getById = async (req, res) => {
    try {
        const requestDTO = plainToInstance(GetEmployeeRequestDTO, {
            ...req.params,
            ...req.query,
        });
        const employee = await employeeService.getById(requestDTO);
        res.status(200).json({ success: true, employee });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const update = async (req, res) => {
    try {
        const requestDto = plainToInstance(UpdateEmployeeRequestDTO, {
            ...req.body,
            ...req.params,
            image: req.file ? req.file.filename : "",
        });
        await employeeService.update(requestDto);
        res
            .status(200)
            .json({ success: true, message: "Employee updated successfully." });
    }
    catch (error) {
        res
            .status(error.status || 500)
            .json({ success: false, error: error.message });
    }
};
export const getByDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const employees = await employeeService.getByDepartment(id);
        res.status(200).json({ success: true, employees });
    }
    catch (error) {
        res
            .status(error.status || 500)
            .json({ success: false, error: error.message });
    }
};
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.delete(id);
        if (!employee) {
            res.status(404).json({ success: false, error: "Employee not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Employee Deleted Successfully." });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
//# sourceMappingURL=employeeController.js.map
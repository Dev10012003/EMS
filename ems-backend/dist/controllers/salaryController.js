import { plainToInstance } from "class-transformer";
import { GetSalaryRequestDTO } from "../dTOs/request/getSalaryRequestDTO.js";
import { salaryService } from "../services/salaryService.js";
import { generatePDF } from "../utils/generatePdf.js";
import { AddSalaryRequestDTO } from "../dTOs/request/addSalaryRequestDTO.js";
export const getAll = async (req, res) => {
    try {
        const requestDTO = plainToInstance(GetSalaryRequestDTO, {
            ...req.query,
            ...req.params,
        });
        const result = await salaryService.getSalaries(requestDTO);
        res.status(200).json({
            success: true,
            salaryResponse: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
export const generateSalaryPDF = async (req, res) => {
    try {
        const { id } = req.params;
        const salaryData = await salaryService.getSalaryPDF(id);
        await generatePDF(salaryData, res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
export const getByEmployeeId = async (req, res) => {
    try {
        const { id } = req.params;
        const salaryDetail = await salaryService.getByEmployeeId(id);
        res.status(200).json({
            success: true,
            salaryDetail,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
export const getSalaryStructure = async (req, res) => {
    try {
        const { id } = req.params;
        const salaryDetail = await salaryService.getSalaryDetail(id);
        res.status(200).json({
            success: true,
            salaryDetail,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        await salaryService.updateStatus(id);
        res
            .status(200)
            .json({ success: true, message: "Salary Paid Successfully." });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
export const add = async (req, res) => {
    try {
        const dto = plainToInstance(AddSalaryRequestDTO, req.body);
        await salaryService.add(dto);
        res
            .status(200)
            .json({ success: true, message: "Salary Created Successfully!" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const processSalaries = async (req, res) => {
    try {
        await salaryService.processSalaries();
        res
            .status(200)
            .json({ success: true, message: "Salaries processed successfully." });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
//# sourceMappingURL=salaryController.js.map
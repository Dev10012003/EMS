import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { GetSalaryRequestDTO } from "../dTOs/request/getSalaryRequestDTO.js";
import { salaryService } from "../services/salaryService.js";
import { generatePDF } from "../utils/generatePdf.js";
import { AddSalaryRequestDTO } from "../dTOs/request/addSalaryRequestDTO.js";
import moment from "moment";

export const getAll = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const generateSalaryPDF = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salaryData = await salaryService.getSalaryPDF(id);
    await generatePDF(salaryData, res);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getByEmployeeId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salaryDetail = await salaryService.getByEmployeeId(id);
    res.status(200).json({
      success: true,
      salaryDetail,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSalaryStructure = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salaryDetail = await salaryService.getSalaryDetail(id);
    res.status(200).json({
      success: true,
      salaryDetail,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await salaryService.updateStatus(id);
    res
      .status(200)
      .json({ success: true, message: "Salary Paid Successfully." });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const dto = plainToInstance(AddSalaryRequestDTO, req.body);
    await salaryService.add(dto);
    res
      .status(200)
      .json({ success: true, message: "Salary Created Successfully!" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const processSalaries = async (req: Request, res: Response) => {
  try {
    await salaryService.processSalaries();
    res
      .status(200)
      .json({ success: true, message: "Salaries processed successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

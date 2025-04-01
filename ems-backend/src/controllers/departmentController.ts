import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { AddDepartmentRequestDTO } from "../dTOs/request/addDepartmentRequestDTO.js";
import { UpdateDepartmentRequestDTO } from "../dTOs/request/updateDepartmentRequestDTO.js";
import { departmentService } from "../services/departmentService.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const departments = await departmentService.getAll();
    res.status(200).json({ success: true, departments });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const requestDto = plainToInstance(AddDepartmentRequestDTO, req.body);
    await departmentService.add(requestDto);
    res
      .status(201)
      .json({ success: true, message: "Department Added Successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await departmentService.getById(id);
    if (!department) {
      res.status(404).json({ success: false, error: "Department not found" });
      return;
    }
    res.status(200).json({ success: true, department });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(UpdateDepartmentRequestDTO, {
      ...req.params,
      ...req.body,
    });
    const department = await departmentService.update(requestDTO);
    if (!department) {
      res.status(404).json({ success: false, error: "Department not found." });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Department Updated Successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await departmentService.delete(id);
    if (!department) {
      res.status(404).json({ success: false, error: "Department not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Department Deleted Successfully." });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, error: "Delete department server error" });
  }
};

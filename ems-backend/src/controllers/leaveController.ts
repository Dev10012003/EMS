import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { AddLeaveRequestDTO } from "../dTOs/request/addLeaveRequestDTO.js";
import { GetLeaveRequestDTO } from "../dTOs/request/getLeaveRequestDTO.js";
import { UpdateLeaveStatusRequestDTO } from "../dTOs/request/updateLeaveStatusRequestDTO.js";
import { leaveService } from "../services/leaveService.js";

export const add = async (req: Request, res: Response) => {
  try {
    const requestDto = plainToInstance(AddLeaveRequestDTO, req.body);
    await leaveService.add(requestDto);
    res.status(201).json({
      success: true,
      message: "Leave Created Successfully.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const leaves = await leaveService.getAll();
    res.status(200).json({ success: true, leaves });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getByEmployeeId = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(GetLeaveRequestDTO, {
      ...req.params,
      ...req.query,
    });
    const result = await leaveService.getByEmployeeId(requestDTO);
    res.status(200).json({
      success: true,
      leaveResponse: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const leave = await leaveService.getById(id);
    if (!leave) {
      res.status(404).json({ success: false, message: "Leave not found" });
      return;
    }
    res.status(200).json({ success: true, leave });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(UpdateLeaveStatusRequestDTO, {
      ...req.params,
      ...req.body,
    });
    const leave = await leaveService.updateStatus(requestDTO);
    if (!leave) {
      res.status(404).json({ success: false, message: "Leave not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Leave status updated." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

import { plainToInstance } from "class-transformer";
import { AddLeaveRequestDTO } from "../dTOs/request/addLeaveRequestDTO.js";
import { GetLeaveRequestDTO } from "../dTOs/request/getLeaveRequestDTO.js";
import { UpdateLeaveStatusRequestDTO } from "../dTOs/request/updateLeaveStatusRequestDTO.js";
import { leaveService } from "../services/leaveService.js";
export const add = async (req, res) => {
    try {
        const requestDto = plainToInstance(AddLeaveRequestDTO, req.body);
        await leaveService.add(requestDto);
        res.status(201).json({
            success: true,
            message: "Leave Created Successfully.",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getAll = async (req, res) => {
    try {
        const leaves = await leaveService.getAll();
        res.status(200).json({ success: true, leaves });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getByEmployeeId = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await leaveService.getById(id);
        if (!leave) {
            res.status(404).json({ success: false, message: "Leave not found" });
            return;
        }
        res.status(200).json({ success: true, leave });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const updateStatus = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
//# sourceMappingURL=leaveController.js.map
import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { ChangePasswordRequestDTO } from "../dTOs/request/changePasswordRequestDTO.js";
import { settingService } from "../services/settingService.js";

export const changePassword = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(ChangePasswordRequestDTO, req.body);
    await settingService.changePassword(requestDTO);
    res
      .status(200)
      .json({ success: true, message: "Password Changed successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

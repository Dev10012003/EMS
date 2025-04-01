import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { ForgotPasswordRequestDTO } from "../dTOs/request/forgotPasswordRequestDTO.js";
import { LoginRequestDTO } from "../dTOs/request/loginRequestDTO.js";
import { ResetPasswordRequestDTO } from "../dTOs/request/resetPasswordRequestDTO.js";
import { authService } from "../services/authService.js";

export const login = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(LoginRequestDTO, req.body);
    const loginResponse = await authService.login(requestDTO);
    res.status(200).json({ success: true, loginResponse });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const verify = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, user: req.user });
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(ForgotPasswordRequestDTO, req.body);
    await authService.forgotPassword(requestDTO);
    res.status(200).json({
      success: true,
      message: "Reset Password Email Sent Successfully.",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const requestDTO = plainToInstance(ResetPasswordRequestDTO, {
      ...req.params,
      ...req.body,
    });

    await authService.resetPassword(requestDTO);
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

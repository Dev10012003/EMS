import { Router } from "express";
import {
  resetPassword,
  forgotPassword,
  login,
  verify,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateDTO } from "../middlewares/validateDTOMiddleware.js";
import { LoginRequestDTO } from "../dTOs/request/loginRequestDTO.js";
import { ResetPasswordRequestDTO } from "../dTOs/request/resetPasswordRequestDTO.js";
import { ForgotPasswordRequestDTO } from "../dTOs/request/forgotPasswordRequestDTO.js";

const router = Router();
router.post("/login", validateDTO(LoginRequestDTO), login);
router.post(
  "/forgot-password",
  validateDTO(ForgotPasswordRequestDTO),
  forgotPassword
);
router.post(
  "/reset-password/:token",
  validateDTO(ResetPasswordRequestDTO),
  resetPassword
);
router.post("/verify", authMiddleware, verify);

export default router;

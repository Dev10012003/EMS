import bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import jwt from "jsonwebtoken";
import { ForgotPasswordRequestDTO } from "../dTOs/request/forgotPasswordRequestDTO.js";
import { LoginRequestDTO } from "../dTOs/request/loginRequestDTO.js";
import { ResetPasswordRequestDTO } from "../dTOs/request/resetPasswordRequestDTO.js";
import { LoginResponseDTO } from "../dTOs/response/loginResponseDTO.js";
import { sendMail } from "../utils/mailer.js";
import { authRepository } from "../repositories/authRepository.js";

const JWT_KEY = process.env.JWT_KEY || "secret";

export class AuthService {
  async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, password } = dto;
    const user = await authRepository.findByEmail(email);
    if (!user) throw new Error("User not found !");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong Password !");

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_KEY, {
      expiresIn: "10d",
    });

    const responseDTO = plainToInstance(LoginResponseDTO, {
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });

    return responseDTO;
  }

  async forgotPassword(dto: ForgotPasswordRequestDTO) {
    const { email } = dto;
    const user = await authRepository.findByEmail(email);
    if (!user) throw new Error("User not found!");

    const resetToken = jwt.sign({ id: user._id }, JWT_KEY, {
      expiresIn: "15m",
    });
    const resetLink = `https://ems-mcs2.onrender.com/reset-password/${resetToken}`;

    await sendMail(email, "Password Reset Request", `Reset link: ${resetLink}`);
  }

  async resetPassword(dto: ResetPasswordRequestDTO) {
    const { token, newPassword } = dto;
    const decoded: any = jwt.verify(token, JWT_KEY);
    const user = await authRepository.findById(decoded.id);
    if (!user) throw new Error("Invalid or expired token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authRepository.updatePassword(user._id, hashedPassword);
  }
}

export const authService = new AuthService();

import bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import jwt from "jsonwebtoken";
import { LoginResponseDTO } from "../dTOs/response/loginResponseDTO.js";
import { sendMail } from "../utils/mailer.js";
import { authRepository } from "../repositories/authRepository.js";
const JWT_KEY = process.env.JWT_KEY || "secret";
export class AuthService {
    async login(dto) {
        const { email, password } = dto;
        const user = await authRepository.findByEmail(email);
        if (!user)
            throw new Error("User not found !");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new Error("Wrong Password !");
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
    async forgotPassword(dto) {
        const { email } = dto;
        const user = await authRepository.findByEmail(email);
        if (!user)
            throw new Error("User not found!");
        const resetToken = jwt.sign({ id: user._id }, JWT_KEY, {
            expiresIn: "15m",
        });
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        await sendMail(email, "Password Reset Request", `Reset link: ${resetLink}`);
    }
    async resetPassword(dto) {
        const { token, newPassword } = dto;
        const decoded = jwt.verify(token, JWT_KEY);
        const user = await authRepository.findById(decoded.id);
        if (!user)
            throw new Error("Invalid or expired token");
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await authRepository.updatePassword(user._id, hashedPassword);
    }
}
export const authService = new AuthService();
//# sourceMappingURL=authService.js.map
import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
export class SettingService {
    async changePassword(dto) {
        const { userId, oldPassword, newPassword } = dto;
        const user = await authRepository.findById(userId);
        if (!user)
            throw new Error("User not found");
        const isMatchOldPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isMatchOldPassword)
            throw new Error("Old password is incorrect");
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword)
            throw new Error("New password is same as old password");
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await authRepository.updatePassword(userId, hashPassword);
    }
}
export const settingService = new SettingService();
//# sourceMappingURL=settingService.js.map
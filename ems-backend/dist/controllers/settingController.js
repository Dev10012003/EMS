import { plainToInstance } from "class-transformer";
import { ChangePasswordRequestDTO } from "../dTOs/request/changePasswordRequestDTO.js";
import { settingService } from "../services/settingService.js";
export const changePassword = async (req, res) => {
    try {
        const requestDTO = plainToInstance(ChangePasswordRequestDTO, req.body);
        await settingService.changePassword(requestDTO);
        res
            .status(200)
            .json({ success: true, message: "Password Changed successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
//# sourceMappingURL=settingController.js.map
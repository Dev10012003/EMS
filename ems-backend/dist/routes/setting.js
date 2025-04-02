import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { changePassword } from "../controllers/settingController.js";
import { ChangePasswordRequestDTO } from "../dTOs/request/changePasswordRequestDTO.js";
import { validateDTO } from "../middlewares/validateDTOMiddleware.js";
const router = Router();
router.put("/change-password", validateDTO(ChangePasswordRequestDTO), authMiddleware, changePassword);
export default router;
//# sourceMappingURL=setting.js.map
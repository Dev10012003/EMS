import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateDTO } from "../middlewares/validateDTOMiddleware.js";
import { add, getAll, getByEmployeeId, getById, updateStatus, } from "../controllers/leaveController.js";
import { AddLeaveRequestDTO } from "../dTOs/request/addLeaveRequestDTO.js";
import { UpdateLeaveStatusRequestDTO } from "../dTOs/request/updateLeaveStatusRequestDTO.js";
const router = Router();
router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getByEmployeeId);
router.get("/detail/:id", authMiddleware, getById);
router.post("/add", validateDTO(AddLeaveRequestDTO), authMiddleware, add);
router.put("/:id", validateDTO(UpdateLeaveStatusRequestDTO), authMiddleware, updateStatus);
export default router;
//# sourceMappingURL=leave.js.map
import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateDTO } from "../middlewares/validateDTOMiddleware.js";
import { getAll, add, getById, update, deleteDepartment, } from "../controllers/departmentController.js";
import { AddDepartmentRequestDTO } from "../dTOs/request/addDepartmentRequestDTO.js";
import { UpdateDepartmentRequestDTO } from "../dTOs/request/updateDepartmentRequestDTO.js";
const router = Router();
router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getById);
router.post("/", validateDTO(AddDepartmentRequestDTO), authMiddleware, add);
router.put("/:id", validateDTO(UpdateDepartmentRequestDTO), authMiddleware, update);
router.delete("/:id", authMiddleware, deleteDepartment);
export default router;
//# sourceMappingURL=department.js.map
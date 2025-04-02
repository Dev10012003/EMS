import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateDTO } from "../middlewares/validateDTOMiddleware.js";
import { upload } from "../middlewares/upload.js";
import { AddEmployeeRequestDTO } from "../dTOs/request/addEmployeeRequestDTO.js";
import { add, getAll, getById, update, getByDepartment, deleteEmployee, } from "../controllers/employeeController.js";
import { GetEmployeeRequestDTO } from "../dTOs/request/getEmployeeRequestDTO.js";
import { UpdateEmployeeRequestDTO } from "../dTOs/request/updateEmployeeRequestDTO.js";
const router = Router();
router.get("/", authMiddleware, getAll);
router.get("/:id", validateDTO(GetEmployeeRequestDTO), authMiddleware, getById);
router.get("/department/:id", authMiddleware, getByDepartment);
router.post("/add", upload.single("image"), validateDTO(AddEmployeeRequestDTO), authMiddleware, add);
router.put("/:id", upload.single("image"), validateDTO(UpdateEmployeeRequestDTO), authMiddleware, update);
router.delete("/:id", authMiddleware, deleteEmployee);
export default router;
//# sourceMappingURL=employee.js.map
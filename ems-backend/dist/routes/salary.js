import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateDTO } from "../middlewares/validateDTOMiddleware.js";
import { GetSalaryRequestDTO } from "../dTOs/request/getSalaryRequestDTO.js";
import { getAll, add, generateSalaryPDF, getByEmployeeId, getSalaryStructure, updateStatus, } from "../controllers/salaryController.js";
import { AddSalaryRequestDTO } from "../dTOs/request/addSalaryRequestDTO.js";
const router = Router();
router.get("/:id", validateDTO(GetSalaryRequestDTO), authMiddleware, getAll);
router.get("/download/:id", authMiddleware, generateSalaryPDF);
router.get("/salary-detail/:id", authMiddleware, getByEmployeeId);
router.get("/structure/:id", authMiddleware, getSalaryStructure);
router.post("/add", validateDTO(AddSalaryRequestDTO), authMiddleware, add);
router.put("/:id", authMiddleware, updateStatus);
export default router;
//# sourceMappingURL=salary.js.map
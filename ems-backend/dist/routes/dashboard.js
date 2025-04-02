import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAdminSummary, getEmployeeSummary, } from "../controllers/dashboardController.js";
const router = Router();
router.get("/adminSummary", authMiddleware, getAdminSummary);
router.get("/employeeSummary/:id", authMiddleware, getEmployeeSummary);
export default router;
//# sourceMappingURL=dashboard.js.map
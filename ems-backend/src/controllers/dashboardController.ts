import { Request, Response } from "express";
import { summaryService } from "../services/dashboardService.js";

export const getAdminSummary = async (req: Request, res: Response) => {
  try {
    const summary = await summaryService.getAdminSummary();
    res.status(200).json({
      success: true,
      ...summary,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getEmployeeSummary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const summary = await summaryService.getEmployeeSummary(id);
    res.status(200).json({
      success: true,
      ...summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

import mongoose, { Document } from "mongoose";

export interface ISalary extends Document {
  employeeId: mongoose.Types.ObjectId;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  leaveDays: number;
  leaveDeduction: number;
  paidLeavesUsed: number;
  carryForwardLeaves: number;
  payDate: Date;
  status: "Pending" | "Paid";
  createdAt: Date;
  updatedAt: Date;
}

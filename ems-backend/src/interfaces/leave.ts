import mongoose, { Document } from "mongoose";

export interface ILeave extends Document {
  employeeId: mongoose.Types.ObjectId;
  leaveType: "Sick Leave" | "Casual Leave" | "Annual Leave";
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedAt: Date;
  updatedAt: Date;
}

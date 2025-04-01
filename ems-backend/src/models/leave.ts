import { ILeave } from "../interfaces/leave.js";
import mongoose, { Model, Schema } from "mongoose";

const leaveSchema = new Schema<ILeave>({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Leave: Model<ILeave> = mongoose.model<ILeave>("Leave", leaveSchema);
export default Leave;

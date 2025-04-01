import { ISalary } from "../interfaces/salary.js";
import { model, Schema } from "mongoose";

const salarySchema = new Schema<ISalary>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    basicSalary: { type: Number, required: true },
    allowances: { type: Number, required: true },
    deductions: { type: Number, required: true },
    netSalary: { type: Number, required: true },
    leaveDays: { type: Number, default: 0 },
    leaveDeduction: { type: Number, default: 0 },
    paidLeavesUsed: { type: Number, default: 0 },
    carryForwardLeaves: { type: Number, default: 0 },
    payDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  },
  {
    timestamps: true,
  }
);

const Salary = model<ISalary>("Salary", salarySchema);

export default Salary;

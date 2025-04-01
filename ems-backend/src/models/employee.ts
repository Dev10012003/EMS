import { IEmployee } from "../interfaces/employee.js";
import { model, Schema } from "mongoose";
import Salary from "./salary.js";
import Leave from "./leave.js";
import User from "./user.js";

const employeeSchema = new Schema<IEmployee>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, unique: true, required: true },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    designation: { type: String },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

employeeSchema.pre<IEmployee>(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employee = this as IEmployee;

      if (!employee) {
        return next(new Error("Employee not found"));
      }

      const empId = employee._id;
      const userId = employee.userId;

      await Promise.all([
        Salary.deleteMany({ employeeId: empId }),
        Leave.deleteMany({ employeeId: empId }),
        User.deleteOne({ _id: userId }),
      ]);

      next();
    } catch (error) {
      next(error as Error);
    }
  }
);

const Employee = model<IEmployee>("Employee", employeeSchema);
export default Employee;

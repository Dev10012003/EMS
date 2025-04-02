import mongoose, { Schema } from "mongoose";
import Employee from "./employee.js";
import Salary from "./salary.js";
import Leave from "./leave.js";
import User from "./user.js";
const departmentSchema = new Schema({
    dep_name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });
departmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        const employees = await Employee.find({ department: this._id });
        const empIds = employees.map((emp) => emp._id);
        const empUserIds = employees.map((emp) => emp.userId);
        await Employee.deleteMany({ department: this._id });
        await Salary.deleteMany({ employeeId: { $in: empIds } });
        await Leave.deleteMany({ employeeId: { $in: empIds } });
        await User.deleteMany({ _id: { $in: empUserIds } });
        next();
    }
    catch (error) {
        next(error);
    }
});
const Department = mongoose.model("Department", departmentSchema);
export default Department;
//# sourceMappingURL=department.js.map
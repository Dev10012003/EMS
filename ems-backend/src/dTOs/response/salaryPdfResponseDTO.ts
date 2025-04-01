import { ObjectId } from "mongoose";

export class EmployeeDTO {
  _id!: ObjectId;
  employeeId!: string;
  userId!: {
    _id: ObjectId;
    name: string;
    email: string;
  };
  department!: {
    _id: ObjectId;
    dep_name: string;
  };
}

export class SalaryDTO {
  employeeId!: EmployeeDTO;
  basicSalary!: number;
  allowances!: number;
  deductions!: number;
  leaveDays!: number;
  leaveDeduction!: number;
  paidLeavesUsed!: number;
  carryForwardLeaves!: number;
  netSalary!: number;
  payDate!: Date;
}

export class EmployeeSalaryResponseDTO {
  employeeId!: string;
  basicSalary!: number;
  allowances!: number;
  deductions!: number;
  netSalary!: number;
  leaveDays!: number;
  leaveDeduction!: number;
  paidLeavesUsed!: number;
  carryForwardLeaves!: number;
  payDate!: Date;
  status!: "Pending" | "Paid";
}

export class SalaryResponseDTO {
  employeeSalaries!: EmployeeSalaryResponseDTO[];
  totalRecords!: number;
}

export interface ISalaryFormValues {
  department: string;
  employeeId: string;
  basicSalary: number | null;
  allowances: number | null;
  deductions: number | null;
  payDate: string;
}

export interface IEmployeeSalary {
  _id: string;
  employeeId: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  leaveDays: number;
  leaveDeduction: number;
  paidLeavesUsed: number;
  carryForwardLeaves: number;
  payDate: Date;
  status: string;
}

export interface ISalaryStructure {
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
}

export interface ISalaryResponse {
  employeeSalaries: IEmployeeSalary[];
  totalRecords: number;
}

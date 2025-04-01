export interface IAdminDashboardProps {
  success: boolean;
  totalEmployees: number;
  totalDepartments: number;
  totalSalaries: number;
  leaveSummary: {
    appliedFor: ILeaveData[];
    approved: ILeaveData[];
    pending: ILeaveData[];
    rejected: ILeaveData[];
  };
  salarySummary: ISalaryData[];
}

interface ILeaveData {
  days: number;
  reason: string;
  leaveType: string;
  employeeId: string;
}

interface ISalaryData {
  payDate: Date;
  status: string;
  employeeId: number;
}

export interface ISummaryCardProps {
  icon: React.ReactNode;
  text: string;
  number: number;
  color: string;
  isCurrency?: boolean;
  details?: Object[];
}

export interface IEmployeeDashboardProps {
  success: boolean;
  salaryData: {
    month: string;
    netSalary: number;
  }[];
  leaveData: {
    leaveType: string;
    status: string;
    count: number;
  }[];
}

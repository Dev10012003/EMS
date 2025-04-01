import { IEmployeeLeave } from "./Employee";

export interface ILeave {
  _id: string;
  employeeId: IEmployeeLeave;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
  leaveType: string;
}

export interface ILeaveData {
  _id: string;
  employeeId: string;
  name: string;
  leaveType: string;
  dep_name: string;
  status: string;
  days: number;
  action: React.ReactNode;
}

export interface ILeaveList {
  _id: number;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: number;
  appliedAt: Date;
  status: string;
}

export interface ILeaveFormValues {
  userId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ILeaveResponse {
  leaves: ILeaveList[];
  totalRecords: number;
}

import { IDepartmentName } from "./Department";
import { IUser } from "./User";

export interface IEmployeeLeave {
  employeeId: string;
  userId: IUser;
  department: IDepartmentName;
}

export interface IAddEmployeeFormValues {
  name: string;
  email: string;
  employeeId: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: string;
  salary: number;
  password: string;
  role: string;
  image: File | null;
}

export interface IEditEmployeeFormValues {
  name: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  designation: string;
  department: string;
  role: string;
  image?: string;
}

export interface IEmployeeTableData {
  _id: string;
  name: string;
  dep_name: string;
  dob: Date;
  profileImage: string;
  action: React.ReactNode;
}

export interface IEmployee {
  _id: string;
  dob: Date;
  gender: string;
  maritalStatus: string;
  userId: IUser;
  department: IDepartmentName;
  employeeId: string;
  designation: string;
  salary: number;
}

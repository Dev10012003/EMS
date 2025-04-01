import { Document, Types } from "mongoose";

export interface IEmployee extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  employeeId: string;
  dob?: Date;
  gender?: string;
  maritalStatus?: string;
  designation?: string;
  department: Types.ObjectId;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}

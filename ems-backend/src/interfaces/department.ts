import { Document } from "mongoose";

export interface IDepartment extends Document {
  dep_name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

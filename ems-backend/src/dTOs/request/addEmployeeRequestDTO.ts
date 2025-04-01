import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";
import { Transform } from "class-transformer";

export class AddEmployeeRequestDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  employeeId!: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dob!: Date;

  @IsString()
  gender!: string;

  @IsString()
  maritalStatus!: string;

  @IsString()
  designation!: string;

  @IsString()
  department!: string;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  salary!: number;

  @IsString()
  password!: string;

  @IsString()
  role!: string;

  @IsOptional()
  image?: string;
}

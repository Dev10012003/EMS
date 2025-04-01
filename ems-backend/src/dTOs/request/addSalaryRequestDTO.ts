import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddSalaryRequestDTO {
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @IsNumber()
  @IsNotEmpty()
  basicSalary!: number;

  @IsNumber()
  @IsNotEmpty()
  allowances!: number;

  @IsNumber()
  @IsNotEmpty()
  deductions!: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  payDate!: Date;
}

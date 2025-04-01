import { IsDate, IsMongoId, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateEmployeeRequestDTO {
  @IsMongoId({ message: "Invalid Employee ID format" })
  id!: string;

  @IsString()
  name!: string;

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

  @IsString()
  role!: string;

  @IsOptional()
  image?: string;
}

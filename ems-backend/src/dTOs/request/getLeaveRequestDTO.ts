import { IsOptional, IsEnum, IsString, IsNumberString } from "class-validator";

export class GetLeaveRequestDTO {
  @IsString({ message: "Invalid ID format" })
  id!: string;

  @IsOptional()
  @IsEnum(["employee", "admin"], { message: "Invalid role" })
  role?: string;

  @IsOptional()
  @IsNumberString({}, { message: "Invalid page number" })
  currentPage?: string;

  @IsOptional()
  @IsNumberString({}, { message: "Invalid limit" })
  limit?: string;

  @IsOptional()
  @IsString({ message: "Invalid status" })
  status?: string;

  @IsOptional()
  @IsString({ message: "Invalid orderBy" })
  orderBy?: string;

  @IsOptional()
  @IsEnum(["asc", "desc"], { message: "Invalid orderDirection" })
  orderDirection?: string;
}

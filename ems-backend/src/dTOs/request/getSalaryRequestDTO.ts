import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetSalaryRequestDTO {
  @IsString()
  role!: string;

  @IsString()
  id!: string;

  @IsOptional()
  @IsNumberString({}, { message: "Invalid page number" })
  currentPage?: string;

  @IsOptional()
  @IsNumberString({}, { message: "Invalid limit" })
  limit?: string;

  @IsOptional()
  @IsString()
  orderBy?: string = "payDate";

  @IsOptional()
  @IsString()
  orderDirection?: "asc" | "desc" = "asc";
}

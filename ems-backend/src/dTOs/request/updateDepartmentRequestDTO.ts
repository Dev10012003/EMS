import { IsMongoId, IsString } from "class-validator";

export class UpdateDepartmentRequestDTO {
  @IsMongoId({ message: "Invalid Department ID format" })
  id!: string;

  @IsString()
  dep_name!: string;

  @IsString()
  description?: string;
}

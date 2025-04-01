import { IsString } from "class-validator";

export class AddDepartmentRequestDTO {
  @IsString()
  dep_name!: string;

  @IsString()
  description?: string;
}

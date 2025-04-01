import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class GetEmployeeRequestDTO {
  @IsMongoId({ message: "Invalid ID format" })
  id!: string;

  @IsNotEmpty({ message: "Role cannot be empty" })
  @IsString({ message: "Role must be a string" })
  role!: string;
}

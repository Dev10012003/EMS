import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordRequestDTO {
  @IsString()
  @IsNotEmpty({ message: "User ID is required" })
  userId!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  oldPassword!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  newPassword!: string;
}

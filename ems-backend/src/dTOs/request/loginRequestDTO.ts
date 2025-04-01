import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginRequestDTO {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password!: string;
}

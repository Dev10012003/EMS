import { IsEmail } from "class-validator";

export class ForgotPasswordRequestDTO {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;
}

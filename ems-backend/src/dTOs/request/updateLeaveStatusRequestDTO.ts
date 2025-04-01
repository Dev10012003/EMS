import { IsEnum, IsMongoId } from "class-validator";

export class UpdateLeaveStatusRequestDTO {
  @IsMongoId({ message: "Invalid Leave ID format" })
  id!: string;

  @IsEnum(["Pending", "Approved", "Rejected"], {
    message: "Invalid status",
  })
  status!: "Pending" | "Approved" | "Rejected";
}

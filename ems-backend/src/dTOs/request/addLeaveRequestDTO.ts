import { IsDateString, IsEnum, IsMongoId, IsString } from "class-validator";

export class AddLeaveRequestDTO {
  @IsMongoId({ message: "Invalid Employee ID" })
  userId!: string;

  @IsEnum(["Sick Leave", "Casual Leave", "Annual Leave"], {
    message: "Invalid leave type",
  })
  leaveType!: "Sick Leave" | "Casual Leave" | "Annual Leave";

  @IsDateString({}, { message: "Invalid start date format" })
  startDate!: string;

  @IsDateString({}, { message: "Invalid end date format" })
  endDate!: string;

  @IsString({ message: "Reason must be a string" })
  reason!: string;
}

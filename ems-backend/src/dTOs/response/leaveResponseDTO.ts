import { ILeave } from "../../interfaces/leave.js";

export class LeaveResponseDTO {
  leaves!: ILeave[];
  totalRecords!: number;
}

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDateString, IsEnum, IsMongoId, IsString } from "class-validator";
export class AddLeaveRequestDTO {
    userId;
    leaveType;
    startDate;
    endDate;
    reason;
}
__decorate([
    IsMongoId({ message: "Invalid Employee ID" }),
    __metadata("design:type", String)
], AddLeaveRequestDTO.prototype, "userId", void 0);
__decorate([
    IsEnum(["Sick Leave", "Casual Leave", "Annual Leave"], {
        message: "Invalid leave type",
    }),
    __metadata("design:type", String)
], AddLeaveRequestDTO.prototype, "leaveType", void 0);
__decorate([
    IsDateString({}, { message: "Invalid start date format" }),
    __metadata("design:type", String)
], AddLeaveRequestDTO.prototype, "startDate", void 0);
__decorate([
    IsDateString({}, { message: "Invalid end date format" }),
    __metadata("design:type", String)
], AddLeaveRequestDTO.prototype, "endDate", void 0);
__decorate([
    IsString({ message: "Reason must be a string" }),
    __metadata("design:type", String)
], AddLeaveRequestDTO.prototype, "reason", void 0);
//# sourceMappingURL=addLeaveRequestDTO.js.map
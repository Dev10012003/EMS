var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsEnum, IsString, IsNumberString } from "class-validator";
export class GetLeaveRequestDTO {
    id;
    role;
    currentPage;
    limit;
    status;
    orderBy;
    orderDirection;
}
__decorate([
    IsString({ message: "Invalid ID format" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "id", void 0);
__decorate([
    IsOptional(),
    IsEnum(["employee", "admin"], { message: "Invalid role" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsNumberString({}, { message: "Invalid page number" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "currentPage", void 0);
__decorate([
    IsOptional(),
    IsNumberString({}, { message: "Invalid limit" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "limit", void 0);
__decorate([
    IsOptional(),
    IsString({ message: "Invalid status" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "status", void 0);
__decorate([
    IsOptional(),
    IsString({ message: "Invalid orderBy" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "orderBy", void 0);
__decorate([
    IsOptional(),
    IsEnum(["asc", "desc"], { message: "Invalid orderDirection" }),
    __metadata("design:type", String)
], GetLeaveRequestDTO.prototype, "orderDirection", void 0);
//# sourceMappingURL=getLeaveRequestDTO.js.map
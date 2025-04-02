var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDate, IsMongoId, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
export class UpdateEmployeeRequestDTO {
    id;
    name;
    dob;
    gender;
    maritalStatus;
    designation;
    department;
    role;
    image;
}
__decorate([
    IsMongoId({ message: "Invalid Employee ID format" }),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "id", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "name", void 0);
__decorate([
    IsDate(),
    Transform(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], UpdateEmployeeRequestDTO.prototype, "dob", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "gender", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "maritalStatus", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "designation", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "department", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "role", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], UpdateEmployeeRequestDTO.prototype, "image", void 0);
//# sourceMappingURL=updateEmployeeRequestDTO.js.map
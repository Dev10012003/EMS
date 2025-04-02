var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsDate, IsEmail, IsOptional, IsString, IsNumber, } from "class-validator";
import { Transform } from "class-transformer";
export class AddEmployeeRequestDTO {
    name;
    email;
    employeeId;
    dob;
    gender;
    maritalStatus;
    designation;
    department;
    salary;
    password;
    role;
    image;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "name", void 0);
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "email", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "employeeId", void 0);
__decorate([
    IsDate(),
    Transform(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], AddEmployeeRequestDTO.prototype, "dob", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "gender", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "maritalStatus", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "designation", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "department", void 0);
__decorate([
    IsNumber(),
    Transform(({ value }) => Number(value)),
    __metadata("design:type", Number)
], AddEmployeeRequestDTO.prototype, "salary", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "password", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "role", void 0);
__decorate([
    IsOptional(),
    __metadata("design:type", String)
], AddEmployeeRequestDTO.prototype, "image", void 0);
//# sourceMappingURL=addEmployeeRequestDTO.js.map
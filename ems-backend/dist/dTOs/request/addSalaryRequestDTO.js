var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class AddSalaryRequestDTO {
    employeeId;
    basicSalary;
    allowances;
    deductions;
    payDate;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AddSalaryRequestDTO.prototype, "employeeId", void 0);
__decorate([
    IsNumber(),
    IsNotEmpty(),
    __metadata("design:type", Number)
], AddSalaryRequestDTO.prototype, "basicSalary", void 0);
__decorate([
    IsNumber(),
    IsNotEmpty(),
    __metadata("design:type", Number)
], AddSalaryRequestDTO.prototype, "allowances", void 0);
__decorate([
    IsNumber(),
    IsNotEmpty(),
    __metadata("design:type", Number)
], AddSalaryRequestDTO.prototype, "deductions", void 0);
__decorate([
    IsDate(),
    Transform(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], AddSalaryRequestDTO.prototype, "payDate", void 0);
//# sourceMappingURL=addSalaryRequestDTO.js.map
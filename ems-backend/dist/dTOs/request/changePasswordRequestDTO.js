var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsString, MinLength } from "class-validator";
export class ChangePasswordRequestDTO {
    userId;
    oldPassword;
    newPassword;
}
__decorate([
    IsString(),
    IsNotEmpty({ message: "User ID is required" }),
    __metadata("design:type", String)
], ChangePasswordRequestDTO.prototype, "userId", void 0);
__decorate([
    IsString(),
    MinLength(6, { message: "Password must be at least 6 characters" }),
    __metadata("design:type", String)
], ChangePasswordRequestDTO.prototype, "oldPassword", void 0);
__decorate([
    IsString(),
    MinLength(6, { message: "Password must be at least 6 characters" }),
    __metadata("design:type", String)
], ChangePasswordRequestDTO.prototype, "newPassword", void 0);
//# sourceMappingURL=changePasswordRequestDTO.js.map
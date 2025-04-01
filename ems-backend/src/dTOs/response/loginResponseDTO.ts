export class LoginResponseDTO {
  token!: string;
  user!: {
    _id: string;
    name: string;
    role: "admin" | "employee";
  };
}

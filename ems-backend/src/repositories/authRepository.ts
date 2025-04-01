import { IUser } from "../interfaces/user.js";
import User from "../models/user.js";

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new User(userData);
    return await newUser.save();
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await User.findByIdAndUpdate(id, { password: hashedPassword });
  }

  async update(id: string, data: Partial<IUser>): Promise<void> {
    await User.findByIdAndUpdate(id, data);
  }
}

export const authRepository = new AuthRepository();

import User from "../models/user.js";
export class AuthRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }
    async findById(id) {
        return await User.findById(id);
    }
    async create(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }
    async updatePassword(id, hashedPassword) {
        await User.findByIdAndUpdate(id, { password: hashedPassword });
    }
    async update(id, data) {
        await User.findByIdAndUpdate(id, data);
    }
}
export const authRepository = new AuthRepository();
//# sourceMappingURL=authRepository.js.map
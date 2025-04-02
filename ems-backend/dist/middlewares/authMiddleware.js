// import dotenv from "dotenv";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { findUserById } from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/authRepository.js";
const authRepository = new AuthRepository();
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(404).json({ success: false, error: "Token Not Provided" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            res.status(404).json({ success: false, error: "Token Not Valid" });
        }
        const user = await authRepository.findById(decoded._id);
        if (!user) {
            res.status(404).json({ success: false, error: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Server Side Error" });
    }
};
export default verifyUser;
//# sourceMappingURL=authMiddleware.js.map
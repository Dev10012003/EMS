// import dotenv from "dotenv";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { findUserById } from "../repositories/authRepository.js";

// dotenv.config();

// export interface IAuthRequest extends Request {
//   user?: {
//     _id: string;
//     name: string;
//     role: "admin" | "employee";
//   };
// }

// const authMiddleware = async (
//   req: IAuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       res.status(400).json({ success: false, error: "Token is required" });
//       return;
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
//       _id: string;
//     };

//     if (!decoded) {
//       res.status(404).json({ success: false, error: "Token Not Valid" });
//     }

//     const user = await findUserById(decoded._id);

//     if (!user) {
//       res.status(404).json({ success: false, error: "User not found" });
//       return;
//     }

//     req.user = {
//       _id: user._id,
//       name: user.name,
//       role: user.role,
//     };

//     next();
//   } catch (error) {
//     res.status(401).json({ success: false, error: "Unauthorized access" });
//   }
// };

// export default authMiddleware;
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/authRepository.js";
const authRepository = new AuthRepository();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(404).json({ success: false, error: "Token Not Provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as {
      _id: string;
    };

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
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Side Error" });
  }
};

export default verifyUser;

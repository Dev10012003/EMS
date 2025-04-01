import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDTO = (dtoClass: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const requestData = {
      ...req.params,
      ...req.body,
      ...req.query,
    };

    const dtoInstance = plainToInstance(dtoClass, requestData);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}).join(", "))
        .join(" | ");

      res.status(400).json({ success: false, error: errorMessages });
      return;
    }
    next();
  };
};

// backend/src/api/users/login.ts
import { NextFunction, Request, Response } from "express";
import { validate } from "../../utils/validator";
import { loginValidator } from "../../utils/validator";
import { userLogin } from "../../controllers/user-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  await validate(loginValidator)(req, res, async () => {
    try {
      await userLogin(req, res, next);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to login", cause: error.message });
    }
  });
};

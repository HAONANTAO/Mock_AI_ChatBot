// backend/src/api/users/signup.ts
import { NextFunction, Request, Response } from "express";
import { validate } from "../../utils/validator";
import { signupValidator } from "../../utils/validator";
import { userSignup } from "../../controllers/user-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  await validate(signupValidator)(req, res, async () => {
    try {
      await userSignup(req, res, next);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to signup", cause: error.message });
    }
  });
};

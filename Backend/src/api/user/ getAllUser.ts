// backend/src/api/users/getAllUser.ts
import { NextFunction, Request, Response } from "express";
import { getAllUser } from "../../controllers/user-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllUser(req, res, next);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to get all users", cause: error.message });
  }
};

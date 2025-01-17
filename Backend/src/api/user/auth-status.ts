// backend/src/api/users/auth-status.ts
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token-manager";
import { verifyUser } from "../../controllers/user-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyToken(req, res, async () => {
      await verifyUser(req, res, next);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to verify user status", cause: error.message });
  }
};

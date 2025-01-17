// backend/src/api/users/logout.ts
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/token-manager";
import { logoutUser } from "../../controllers/user-controller";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyToken(req, res, async () => {
      await logoutUser(req, res, next);
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to logout", cause: error.message });
  }
};

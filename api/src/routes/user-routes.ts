import {
  getAllUser,
  userSignup,
  userLogin,
  verifyUser,
  logoutUser,
} from "../controllers/user-controller.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
import { json } from "express";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { method, path } = req;
    // 解析 application/json 格式的数据
    await json()(req, res, () => {});

    switch (path) {
      case "/":
        if (method === "GET") {
          try {
            await getAllUser(req, res);
          } catch (getAllUserError: any) {
            console.error("Error fetching all users:", getAllUserError);
            res
              .status(500)
              .send({
                message: "Failed to fetch all users",
                error: getAllUserError.message,
              });
          }
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/signup":
        if (method === "POST") {
          try {
            await validate(signupValidator)(req, res, async () => {
              await userSignup(req, res);
            });
          } catch (validationError: any) {
            console.error("Validation error during signup:", validationError);
            res
              .status(400)
              .send({
                message: "Invalid input data",
                error: validationError.message,
              });
          }
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/login":
        if (method === "POST") {
          try {
            await validate(loginValidator)(req, res, async () => {
              await userLogin(req, res);
            });
          } catch (validationError: any) {
            console.error("Validation error during login:", validationError);
            res
              .status(400)
              .send({
                message: "Invalid input data",
                error: validationError.message,
              });
          }
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/auth-status":
        if (method === "GET") {
          try {
            await verifyToken(req, res, async () => {
              await verifyUser(req, res);
            });
          } catch (verifyError: any) {
            console.error("Token verification failed:", verifyError);
            res
              .status(401)
              .send({ message: "Unauthorized", error: verifyError.message });
          }
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/logout":
        if (method === "GET") {
          try {
            await verifyToken(req, res, async () => {
              await logoutUser(req, res);
            });
          } catch (verifyError: any) {
            console.error("Token verification failed:", verifyError);
            res
              .status(401)
              .send({ message: "Unauthorized", error: verifyError.message });
          }
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      default:
        res.status(404).send({ message: "Not Found" });
    }
  } catch (error: any) {
    console.error("Internal Server Error:", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

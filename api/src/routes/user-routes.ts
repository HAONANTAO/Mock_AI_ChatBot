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

export default async (req, res) => {
  try {
    const { method, path } = req;
    // 解析 application/json 格式的数据
    await json()(req, res, () => {});

    switch (path) {
      case "/":
        if (method === "GET") {
          await getAllUser(req, res);
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/signup":
        if (method === "POST") {
          await validate(signupValidator)(req, res, async () => {
            await userSignup(req, res);
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/login":
        if (method === "POST") {
          await validate(loginValidator)(req, res, async () => {
            await userLogin(req, res);
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/auth-status":
        if (method === "GET") {
          await verifyToken(req, res, async () => {
            await verifyUser(req, res);
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/logout":
        if (method === "GET") {
          await verifyToken(req, res, async () => {
            await logoutUser(req, res);
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      default:
        res.status(404).send({ message: "Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

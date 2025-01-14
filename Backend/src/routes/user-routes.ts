import { Router } from "express";
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
import serverless from "serverless-http";

const userRoutes = Router();

// 定义路由和中间件
userRoutes.get("/", (req, res, next) => {
  getAllUser(req, res, next);
});

userRoutes.get("/test", (req, res) => {
  console.log("test good here");
  res.send("test good");
});

userRoutes.post("/signup", validate(signupValidator), (req, res, next) => {
  userSignup(req, res, next);
});

userRoutes.post("/login", validate(loginValidator), (req, res, next) => {
  userLogin(req, res, next);
});

userRoutes.get("/auth-status", verifyToken, (req, res, next) => {
  verifyUser(req, res, next);
});

userRoutes.get("/logout", verifyToken, (req, res, next) => {
  logoutUser(req, res, next);
});

// 导出命名函数
export const userRoutesHandler = serverless((req, res, next) => {
  try {
    userRoutes(req, res, next);
  } catch (error) {
    console.error("Error occurred in userRoutes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export { userRoutes };

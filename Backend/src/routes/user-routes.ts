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
userRoutes.get("/", getAllUser);

userRoutes.get("/test", (req, res) => {
  console.log("test good here");
  res.send("test good");
});

userRoutes.post("/signup", validate(signupValidator), userSignup);

userRoutes.post("/login", validate(loginValidator), userLogin);

userRoutes.get("/auth-status", verifyToken, verifyUser);

userRoutes.get("/logout", verifyToken, logoutUser);

// 导出 serverless 处理函数
export const handler = serverless((req, res, next) => {
  try {
    userRoutes(req, res, next);
  } catch (error) {
    console.error("Error occurred in userRoutes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

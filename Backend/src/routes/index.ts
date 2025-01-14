import { Router } from "express";
import { userRoutes } from "./user-routes.js";
import { chatRoutes } from "./chat-routes.js";

// 主路由创建 router
const appRouter = Router();

// 分路由集合 routes
appRouter.use("/user", (req, res, next) => {
  try {
    userRoutes(req, res, next);
  } catch (error) {
    console.error("Error occurred in user routes:", error);
    res.status(500).send({ error: "Internal Server Error in user routes" });
  }
});

appRouter.use("/chat", (req, res, next) => {
  try {
    chatRoutes(req, res, next);
  } catch (error) {
    console.error("Error occurred in chat routes:", error);
    res.status(500).send({ error: "Internal Server Error in chat routes" });
  }
});

export default appRouter;

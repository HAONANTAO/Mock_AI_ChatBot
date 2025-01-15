import { Router, Request, Response } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

// 主路由创建 router
const appRouter = Router();

// 分路由集合 routes
appRouter.use("/user", userRoutes); // api/v1/user
appRouter.use("/chat", chatRoutes); // api/v1/chat

// 全局错误处理中间件（可选）
appRouter.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Internal Server Error", error: err.message });
});

export default appRouter;

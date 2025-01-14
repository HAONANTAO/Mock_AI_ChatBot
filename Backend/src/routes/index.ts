import { Router } from "express";
import { userRoutes, userRoutesHandler } from "./user-routes.js";
import { chatRoutes, chatRoutesHandler } from "./chat-routes.js";

// 主路由创建router
const appRouter = Router();

// 分路由集合routes
appRouter.use("/user", userRoutes); //api/v1/user
appRouter.use("/chat", chatRoutes); //api/v1/chat
export default appRouter;

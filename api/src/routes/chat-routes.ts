import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller.js";
import { json } from "express";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { method, path } = req;
    // 解析 application/json 格式的数据
    await json()(req, res, () => {});

    switch (path) {
      case "/new":
        if (method === "POST") {
          await validate(chatCompletionValidator)(req, res, async () => {
            try {
              await verifyToken(req, res, async () => {
                await generateChatCompletion(req, res);
              });
            } catch (verifyError: any) {
              console.error("Token verification failed:", verifyError);
              res
                .status(401)
                .send({ message: "Unauthorized", error: verifyError.message });
            }
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/all-chats":
        if (method === "GET") {
          try {
            await verifyToken(req, res, async () => {
              await sendChatsToUser(req, res);
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
      case "/delete":
        if (method === "DELETE") {
          try {
            await verifyToken(req, res, async () => {
              await deleteChats(req, res);
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

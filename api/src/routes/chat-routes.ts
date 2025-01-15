import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller.js";
import { json } from "express";

export default async (req, res) => {
  try {
    const { method, path } = req;
    // 解析 application/json 格式的数据
    await json()(req, res, () => {});

    switch (path) {
      case "/new":
        if (method === "POST") {
          await validate(chatCompletionValidator)(req, res, async () => {
            await verifyToken(req, res, async () => {
              await generateChatCompletion(req, res);
            });
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/all-chats":
        if (method === "GET") {
          await verifyToken(req, res, async () => {
            await sendChatsToUser(req, res);
          });
        } else {
          res.status(405).send({ message: "Method Not Allowed" });
        }
        break;
      case "/delete":
        if (method === "DELETE") {
          await verifyToken(req, res, async () => {
            await deleteChats(req, res);
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

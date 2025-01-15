import User from "../models/User.js";
import { USERNOT } from "../utils/token-manager.js";
import { configOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { Request, Response } from "express";
import { connectToDatabase } from "../db/connection";

// generateChatCompletion
export const generateChatCompletion = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    // 从数据主体拿到用户输入的信息（问题）
    const { message } = req.body;
    console.log(message);

    // 从 token 下面拿到
    const user = await User.findById(req.cookies.jwtData?.id);
    if (!user) {
      return res.status(401).json({ message: `${USERNOT}` });
    }

    const chats = user.chats.map(
      ({ role, content }: { role: string; content: string }) => ({
        role,
        content,
      }),
    ) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const config = configOpenAI();
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    const content = chatResponse.data.choices[0].message.content;
    console.log(content);
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("Error in generateChatCompletion:", error);
    return res.status(500).json({
      message: "Failed to generate chat completion",
      error: error.message,
    });
  }
};

// sendChatsToUser
export const sendChatsToUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    // user token check
    const user = await User.findById(req.cookies.jwtData?.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (user._id.toString() !== req.cookies.jwtData?.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Permissions didn't match" });
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error: any) {
    console.error("Error in sendChatsToUser:", error);
    return res
      .status(500)
      .json({ message: "Failed to send chats to user", error: error.message });
  }
};

// deleteChats
export const deleteChats = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    // user token check
    const user = await User.findById(req.cookies.jwtData?.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (user._id.toString() !== req.cookies.jwtData?.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Permissions didn't match" });
    }
    // @ts-ignore
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "Chats deleted successfully" });
  } catch (error: any) {
    console.error("Error in deleteChats:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete chats", error: error.message });
  }
};

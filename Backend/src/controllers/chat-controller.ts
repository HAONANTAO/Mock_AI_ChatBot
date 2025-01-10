import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { USERNOT } from "../utils/constants.js";
import { configOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 从数据主体拿到用户输入的信息（问题）
  const { message } = req.body;
  console.log(message);
  try {
    // 从token下面拿到

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: `${USERNOT}` });
    }
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    //

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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something wrong while the GPT chat api" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user token check

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send(`no any chat information here!`);
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

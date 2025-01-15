import User from "../models/User.js";
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME, USERNOT } from "../utils/token-manager.js";

// getAllUser
export const getAllUser = async (req: Request, res: Response) => {
  try {
    // get all users through the model from the database
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "error! not ok!", cause: error.message });
  }
};

// userSignup
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    // store into User database
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN || "localhost", // 从环境变量读取前端域名
      path: "/",
      signed: true,
    });

    // create token
    const token = createToken(user.id.toString(), user.email, "7d");

    // set token expiration
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // send the token to cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: process.env.FRONTEND_DOMAIN || "localhost", // 从环境变量读取前端域名
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: `user ${user.name}, ${user.email} sign up  successfully!`,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error! signup not work!", cause: error.message });
  }
};

// userLogin
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(201).json("user not registered,please check again ");
    }

    const isPasswordCorrected = await compare(password, existedUser.password);
    if (!isPasswordCorrected) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN || "localhost", // 从环境变量读取前端域名
      path: "/",
      signed: true,
    });

    // create token
    const token = createToken(
      existedUser.id.toString(),
      existedUser.email,
      "7d",
    );

    // set token expiration
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // send the token to cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: process.env.FRONTEND_DOMAIN || "localhost", // 从环境变量读取前端域名
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: `user ${existedUser.name}, ${existedUser.email} log in successfully!`,
      name: existedUser.name,
      email: existedUser.email,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "error! signup not work!", cause: error.message });
  }
};

// verifyUser
export const verifyUser = async (req: Request, res: Response) => {
  try {
    // user token check
    const user = await User.findById(req.cookies[COOKIE_NAME]);
    if (!user) {
      return res.status(401).send(`${USERNOT}`);
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// logoutUser
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // clear token cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN || "localhost", // 从环境变量读取前端域名
      path: "/",
      signed: true,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error });
  }
};

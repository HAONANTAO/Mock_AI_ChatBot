import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME, USERNOT } from "../utils/token-manager.js";

// 通用错误处理函数
// const handleError = (res: Response, error: any) => {
//   console.log(error);
//   res.status(500).json({ message: "An error occurred", cause: error.message });
// };

// getAllUser
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //getall users 通过model去数据库找
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
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    // await User.create(user);

    // token

    // 首先清除之前的
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost", // 改成和前端请求的域名一致，去除端口号
      path: "/",

      signed: true,
    });
    // password is corrected
    const token = createToken(user.id.toString(), user.email, "7d");
    // send the token to cookie

    // 7 days set up
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // update later!!
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost", // 改成和前端请求的域名一致，去除端口号
      expires,

      httpOnly: true,
      signed: true,
    });

    // end
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
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 没有名字
    const { email, password } = req.body;

    const existedUser = await User.findOne({ email });
    if (!existedUser)
      return res.status(201).json("user not registered ,please check again ");
    // result是boolean(true) check password
    const isPasswordCorrected = await compare(password, existedUser.password);
    if (!isPasswordCorrected) {
      return res.status(403).json({ message: "Incorrect password" });
    }
    // 首先清除之前的
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost", // 改成和前端请求的域名一致，去除端口号
      path: "/",

      signed: true,
    });
    // password is corrected
    const token = createToken(
      existedUser.id.toString(),
      existedUser.email,
      "7d",
    );
    // send the token to cookie

    // 7 days set up
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    console.log("ready to create cookies");
    // update later!!
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost", // 改成和前端请求的域名一致，去除端口号
      expires,

      httpOnly: true,
      signed: true,
    });
    const sss = req.cookies[`${COOKIE_NAME}`];
    console.log(sss);

    // end
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
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user token check
    // 用token里面的数据找user
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send(`${USERNOT}`);
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
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
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user token check
    // 用token里面的数据找user
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send(`${USERNOT}`);
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // 首先清除之前的token cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost", //
      path: "/",
      signed: true,
    });
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

import User from "../models/User.js";
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME, USERNOT } from "../utils/token-manager.js";
import { connectToDatabase } from "../db/connection";

// getAllUser
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    // get all users through the model from the database
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.error("Error in getAllUser:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch all users", error: error.message });
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
      domain: process.env.FRONTEND_DOMAIN || "localhost",
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
      domain: process.env.FRONTEND_DOMAIN || "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: `user ${user.name}, ${user.email} sign up  successfully!`,
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.error("Error in userSignup:", error);
    return res
      .status(500)
      .json({ message: "Failed to sign up user", error: error.message });
  }
};

// userLogin
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res
        .status(403)
        .json({ message: "User not registered, please check again" });
    }

    const isPasswordCorrected = await compare(password, existedUser.password);
    if (!isPasswordCorrected) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN || "localhost",
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
      domain: process.env.FRONTEND_DOMAIN || "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: `user ${existedUser.name}, ${existedUser.email} log in successfully!`,
      name: existedUser.name,
      email: existedUser.email,
    });
  } catch (error: any) {
    console.error("Error in userLogin:", error);
    return res
      .status(500)
      .json({ message: "Failed to log in user", error: error.message });
  }
};

// verifyUser
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const db = await connectToDatabase();
    // user token check
    const user = await User.findById(req.cookies[COOKIE_NAME]);
    if (!user) {
      return res.status(401).send(`${USERNOT}`);
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error: any) {
    console.error("Error in verifyUser:", error);
    return res
      .status(500)
      .json({ message: "Failed to verify user", error: error.message });
  }
};

// logoutUser
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // clear token cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: process.env.FRONTEND_DOMAIN || "localhost",
      path: "/",
      signed: true,
    });

    return res.status(200).json({ message: "OK" });
  } catch (error: any) {
    console.error("Error in logoutUser:", error);
    return res
      .status(500)
      .json({ message: "Failed to log out user", error: error.message });
  }
};

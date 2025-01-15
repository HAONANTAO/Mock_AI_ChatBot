import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  // JWT sign
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
  return token;
};

// 验证身份
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  // console.log(token);

  // 验证 JSON Web Token（JWT）有效性的中间件逻辑
  // 没有token;
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  // promise
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        // 有token 存到locals

        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};

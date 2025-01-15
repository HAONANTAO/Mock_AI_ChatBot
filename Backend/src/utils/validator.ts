import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// 总检查器运行
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        // 某次验证结果不为空（即出现验证错误）
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      // 没有error就继续运行下一个
      next();
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
    // have error有
  };
};

// login 验证器
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .bail()
    .notEmpty()
    .withMessage("Password cannot be empty"),
];

// signup单独的检查器
export const signupValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    // bail() 方法原理：当把 bail() 加在两个验证方法之间时，一旦前一个验证失败，后续链式连接的验证方法就不再执行
    .bail()
    .isLength({ max: 30 })
    .withMessage("Name should be at most 30 characters"),
  ...loginValidator,
];

// chatCompletionValidator单独的检查器(聊天消息检查)
export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("message is required!"),
];

import { Router } from "express";
import {
  getAllUser,
  userSignup,
  userLogin,
  verifyUser,
  logoutUser,
} from "../controllers/user-controller.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUser);
userRoutes.get("/test", (req, res) => {
  console.log("test good here");
  res.send("test good");
});
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);

userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, logoutUser);
export default userRoutes;

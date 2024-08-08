import { Router } from "express";
import checkEmailMiddleware from "../../middlewares/checkEmail.middleware.js";
import { signin, signup } from "./user.controllers.js";

const userRouter = Router();

// ========================================= sign up ==========================================
userRouter.post("/register", checkEmailMiddleware, signup);

// ========================================= sign in ==========================================
userRouter.post("/login", signin);

export default userRouter;

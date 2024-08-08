import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../../utils/error handling/asyncHandler.js";
import AppError from "../../utils/error handling/AppError.js";
import User from "../../../database/models/user.model.js";

// ========================== signup ===========================
export const signup = asyncHandler(async (req, res, next) => {
  let { email, password, name } = req.body;

  const hashedPass = await bcrypt.hash(password, +process.env.SALT_ROUND);
  password = hashedPass;

  const user = new User({
    email,
    password,
    name: name.toLowerCase(),
  });
  await user.save();

  if (!user)
    return next(
      new AppError("something went wrong in the sign up process", 500)
    );

  res.status(201).json({
    message: "success",
  });
});

// ========================================= sign in ==========================================
export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user?.password)))
    return next(new AppError("invalid email or password", 401));

  const userToken = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_USER_TOKEN_KEY
  );

  return res.json({ message: "success", token: userToken });
});

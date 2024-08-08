import jwt from "jsonwebtoken";
import AppError from "../utils/error handling/AppError.js";
import User from "../../database/models/user.model.js";
import asyncHandler from "./../utils/error handling/asyncHandler.js";

const auth = () => {
  return asyncHandler(async (req, res, next) => {
    // authentication
    const { token } = req.headers;

    const decoded = jwt.verify(token, process.env.JWT_USER_TOKEN_KEY);

    if (!decoded?.email) return next(new AppError("invalid token", 401));

    const user = await User.findOne({ email: decoded?.email });
    if (!user) return next(new AppError("user not exists", 404));

    req.user = user;
    next();
  });
};

export default auth;

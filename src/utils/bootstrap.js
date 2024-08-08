import AppError from "./error handling/AppError.js";
import userRouter from "./../modules/user/user.routes.js";
import accountRouter from "../modules/account/account.routes.js";
import globalErrHandler from "./error handling/globalErrHandler.js";

export default function bootstrap(app, express) {
  const PORT = process.env.PORT || 3000;

  // =============================== body parser ===============================
  app.use(express.json());

  // ============================== routes ===============================
  app.use("/user", userRouter);
  app.use("/account", accountRouter);

  // ============================== error handler ===============================
  app.use("*", (req, res, next) => {
    return next(new AppError(`page not found at ${req.originalUrl}`, 404));
  });

  app.use(globalErrHandler);

  // ========================== error outside express ===========================
  process.on("unhandledRejection", (err) => {
    console.log(`error outside express ${err}`);
  });

  // =========================== listen on any req ===============================
  app.listen(PORT, (err) => {
    if (err) console.log("error in express server", err);
    else console.log("server is running...");
  });
}

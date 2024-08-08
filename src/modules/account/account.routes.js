import { Router } from "express";
import {
  createAccount,
  depositFromAccount,
  getBalance,
  getTransactions,
  withdrawFromAccount,
} from "./account.controllers.js";
import auth from "./../../middlewares/auth.middleware.js";

const accountRouter = Router();

// ========================================= create account ==========================================
accountRouter.post("/", auth(), createAccount);

// ========================================= deposit ==========================================
accountRouter.post("/deposit", auth(), depositFromAccount);

// ========================================= withdraw ==========================================
accountRouter.post("/withdraw", auth(), withdrawFromAccount);

// ========================================= get balance ==========================================
accountRouter.get("/balance", auth(), getBalance);

// ========================================= get transactions history ==========================================
accountRouter.get("/transactions", auth(), getTransactions);

export default accountRouter;

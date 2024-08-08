import asyncHandler from "../../utils/error handling/asyncHandler.js";
import AppError from "../../utils/error handling/AppError.js";
import Account from "../../../database/models/account.model.js";
import Transaction from "../../../database/models/transactions.model.js";

// ========================== create account ===========================
export const createAccount = asyncHandler(async (req, res, next) => {
  const { balance } = req.body;

  if (balance < 0 || !balance)
    return next(
      new AppError("balance is required or balance cannot be negative", 400)
    );

  const accountExists = await Account.findOne({ createdBy: req.user._id });

  if (accountExists) return next(new AppError("account already exists", 409));

  const account = new Account({ createdBy: req.user._id, balance });

  await account.save();

  res.status(201).json({ message: "success", data: account });
});

// ========================================= deposit ==========================================
export const depositFromAccount = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  if (amount < 0 || !amount)
    return next(
      new AppError("amount is required or amount cannot be negative", 400)
    );

  const account = await Account.findOne({ createdBy: req.user._id });

  if (!account)
    return next(
      new AppError("user has no account, please create a new one", 404)
    );
  const transactionAmount = account.balance + +amount;

  const transaction = new Transaction({
    createdBy: req.user._id,
    account: account._id,
    transaction: "deposit",
    amount,
    initialBalance: account.balance,
    date: new Date(),
    finalBalance: transactionAmount,
  });
  await transaction.save();

  account.balance = transactionAmount;
  await account.save();

  res.status(201).json({ message: "success", data: account });
});

// ========================================= withdraw ==========================================
export const withdrawFromAccount = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  if (amount < 0 || !amount)
    return next(
      new AppError("amount is required or amount cannot be negative", 400)
    );

  const account = await Account.findOne({ createdBy: req.user._id });

  if (!account)
    return next(
      new AppError("user has no account, please create a new one", 404)
    );

  if (account.balance < amount)
    return next(new AppError("insufficient balance", 409));

  const transactionAmount = account.balance - +amount;

  const transaction = new Transaction({
    createdBy: req.user._id,
    account: account._id,
    transaction: "withdraw",
    amount,
    initialBalance: account.balance,
    date: new Date(),
    finalBalance: transactionAmount,
  });
  await transaction.save();

  account.balance = transactionAmount;
  await account.save();

  res.status(201).json({ message: "success", data: account });
});

// ========================================= get balance ==========================================
export const getBalance = asyncHandler(async (req, res, next) => {
  const account = await Account.findOne({ createdBy: req.user._id });

  if (!account)
    return next(
      new AppError("user has no account, please create a new one", 404)
    );

  const transaction = new Transaction({
    createdBy: req.user._id,
    account: account._id,
    transaction: "get balance",
    finalBalance: account.balance,
    initialBalance: account.balance,
    amount: 0,
    date: new Date(),
  });

  await transaction.save();

  res.status(201).json({ message: "success", balance: account.balance });
});

// ========================================= get transactions ==========================================
export const getTransactions = asyncHandler(async (req, res, next) => {
  const account = await Account.findOne({ createdBy: req.user._id });

  if (!account)
    return next(
      new AppError("user has no account, please create a new one", 404)
    );

  const transactions = await Transaction.find({ createdBy: req.user._id });

  res.status(201).json({ message: "success", data: transactions });
});

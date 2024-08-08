import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "transaction owner is required"],
      ref: "User",
    },
    account: {
      type: mongoose.Types.ObjectId,
      required: [true, "transaction account is required"],
      ref: "Account",
    },
    transaction: {
      type: String,
      required: [true, "transaction type is required"],
      enum: ["deposit", "withdraw", "get balance"],
    },
    amount: {
      type: Number,
      required: [true, "transaction amount is required"],
    },
    initialBalance: {
      type: Number,
      required: [true, "transaction balance is required"],
    },
    finalBalance: {
      type: Number,
    },
    date: {
      type: Date,
      required: [true, "transaction date is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = mongoose.model("Transaction", schema);

export default Transaction;

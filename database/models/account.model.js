import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "account owner is required"],
      ref: "User",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Account = mongoose.model("Account", schema);

export default Account;

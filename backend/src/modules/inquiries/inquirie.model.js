import mongoose from "mongoose";
import { emailRegex } from "../../utils/constant.js";

const inquirieSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "email must be required"],
      trim: true,
      match: emailRegex,
    },
    subject: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Inquirie = mongoose.model("Inquirie", inquirieSchema);
export default Inquirie;

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  accessTokenExpiry,
  accessTokenSecret,
  refreshTokenExpiry,
  refreshTokenSecret,
} from "../../utils/config.js";
import {
  emailRegex,
  TEMPORARY_TOKEN_EXPIRY,
  userRoleEnums,
} from "../../utils/constant.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "email must be required"],
      trim: true,
      match: emailRegex,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "",
      enum: userRoleEnums,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    emailVerificationToken: {
      type: String,
      default: "",
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenExpiry,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashToken = crypto.randomBytes(20).toString("hex");

  const hashToken = crypto
    .createHash("sha256")
    .update(unHashToken)
    .digest("hex");

  const tokenExpiry = Date.now() + TEMPORARY_TOKEN_EXPIRY;

  return {
    hashToken,
    unHashToken,
    tokenExpiry,
  };
};

const User = mongoose.model("User", userSchema);

export default User;

import { Router } from "express";
import {
  changeCurrentPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
} from "../controller/user.controller.js";
import {
  authChangeCurrentPasswordValidator,
  authloginValidator,
  authRegisterValidator
} from "../validators/auth.validators.js";
import { validate } from "../validators/validate.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";


const router = Router()

router.route("/signup")
            .post(authRegisterValidator(),
            validate,
            registerUser)

router.route("/login")
            .post(authloginValidator(),
            validate,
            loginUser)

router.route("/logout")
            .get(verifyAdmin, logoutUser)

router.route("/update-profile")
            .put(updateUserProfile)

router.route("/get")
            .get(verifyAdmin, getUser)

router.route("/change-current/password")
            .put(authChangeCurrentPasswordValidator(),
             validate,
             verifyAdmin,
             changeCurrentPassword)

export default router;

import { Router } from 'express'
import { addCampusFacility, createAboutSection, deleteCampusFacility, getAbout, updateMissionVision, updatePrincipleMessage, updateSchoolHistory } from './about.controller.js';

const router = Router()

// ! -- this route not for production
// ! -- before prodution remove this route
// ** ---------- create about ----------
router.route("/create-about").post(createAboutSection)

// ? ---------- You can deploy the production routes from given ----------

// ** ---------- get about ----------
router.route("/fetch-about").get(getAbout)


// ** ---------- update school history ----------
router.route("/update-school-history").put(updateSchoolHistory)


// ** ---------- update mission vision ----------
router.route("/update-mission-vision").put(updateMissionVision)


// ** ---------- update principle message ----------
router.route("/update-principle-message").put(updatePrincipleMessage)


// ** ---------- add campuse facility ----------
router.route("/add-campuse-facility").put(addCampusFacility)


// ** ---------- delete campuse facility ----------
router.route("/delete-campuse-facility/:facilityId").delete(deleteCampusFacility)


export default router;

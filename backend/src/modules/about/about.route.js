import { Router } from 'express'
import { addCampusFacility, addFaculityMember, createAboutSection, deleteCampusFacility, deleteFaculityMember, getAbout, updateCampusFacility, updateFaculityMember, updateMissionVision, updatePrincipleMessage, updateSchoolHistory } from './about.controller.js';

const router = Router()

//  !! -- remove before production only route

router.route('/create-about').post(createAboutSection)

// ? -------------- get all about --------------
router.route("/fetch-about").get(getAbout)


// ? -------------- update school history --------------
router.route("/update-school-history").put(updateSchoolHistory)


// ? -------------- update mission vision --------------
router.route("/update-mission-vision").put(updateMissionVision)


// ? -------------- update principle message --------------
router.route("/update-principle-message").put(updatePrincipleMessage)


// ? -------------- add campuse facility --------------
router.route("/add-campuse-facility").put(addCampusFacility)


// ? -------------- add faculity Member --------------
router.route("/add-faculity-member").put(addFaculityMember)


// ? -------------- update campuse facility --------------
router.route("/update-campuse-facility/:facilityId").put(updateCampusFacility)


// ? -------------- update faculity member --------------
router.route("/update-faculity-member/:facultiMemberId").put(updateFaculityMember)


// ? -------------- delete campuse facility --------------
router.route("/delete-campuse-facility/:facilityId").delete(deleteCampusFacility)


// ? -------------- delete faculity member --------------
router.route("/delete-faculity-member/:facultiMemberId").delete(deleteFaculityMember)






export default router;

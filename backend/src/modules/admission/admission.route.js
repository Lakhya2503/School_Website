import { Router } from 'express'
import { deleteAdmission, getAllAdmissions, newAdmission, updateAdmissionReview, updateAdmissionStatus } from './admission.controller.js'

const router = Router()

// ? ------------- Create Event  -------------
router.route("/new-admission").post(newAdmission)


// ** ------------- Update Reviewed  -------------
router.route("/update-addmision-review/:admissionId").put(updateAdmissionReview)



// ** ------------- Update Admission Status  -------------
router.route("/update-addmision-status/:admissionId").put(updateAdmissionStatus)



// ** ------------- Get All Admission  -------------
router.route("/get-all-admission").get(getAllAdmissions)


// ! ------------- Delete Admission  -------------
router.route("/delete-admission/:admissionId").delete(deleteAdmission)


export default router;

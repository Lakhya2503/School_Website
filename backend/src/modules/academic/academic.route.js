import { Router } from 'express'
import { addNewDepartment, deleteDepartment, getAllAcademics, newAcademics, updateCurriculumOverview, updateDepartment, updateTeachingMethodology } from './academic.controller.js';

const router = Router()

//  !! -- remove before production only route this route
router.route('/create-academics').post(newAcademics)



// ? -------------- get academics --------------
router.route("/fetch-academics").get(getAllAcademics)


// ? -------------- update curriculum overview --------------
router.route("/update-curriculum-overview").put(updateCurriculumOverview)


// ? -------------- update teaching methodology --------------
router.route("/update-teaching-methodology").put(updateTeachingMethodology)


// ? -------------- add department  --------------
router.route("/add-department").put(addNewDepartment)


// ? -------------- update department  --------------
router.route("/update-department/:departmentId").put(updateDepartment)


// ? -------------- delete department  --------------
router.route("/delete-department/:departmentId").delete(deleteDepartment)



export default router;

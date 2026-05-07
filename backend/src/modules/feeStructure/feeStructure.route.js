import { Router } from 'express'
import {
  addClassFees,
  deleteFeeStructreClass,
  getFullOfFeeStructure,
  updateClassFee
} from './feeStructure.controller.js';

const router = Router()

router.route("/new-class-fee-structure").post(addClassFees)

router.route("/update-class-structure/:classId").put(updateClassFee)

router.route("/delete-class-structure/:classId").delete(deleteFeeStructreClass)

router.route("/get-fee-structures").get(getFullOfFeeStructure)



export default router;

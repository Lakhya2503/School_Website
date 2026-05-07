import { Router } from 'express'
import { deleteInquirie, getInquiries, newInquirie, updateInquirie } from './inquirie.controller.js';

const router = Router()

router.route("/new-inquirie").post(newInquirie)

router.route("/read/:inquirieId").put(updateInquirie)

router.route("/get-inquirie").get(getInquiries)

router.route("/delete-inquirie/:inquirieId").delete(deleteInquirie)


export default router;

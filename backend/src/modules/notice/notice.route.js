import { Router } from 'express'
import { deleteNotice, getAllNotice, newNotice, updateNotice } from './notice.controller.js';
import { announcementAttachmentUploder } from '../../middleware/multer.middleware.js';

const router = Router()

//  ? -------------------------- new notice --------------------------

router.route("/new-notice").post(announcementAttachmentUploder.fields(
  [
        {
           name : "attachment",
           maxCount : 1,
        }
  ]
),newNotice)

//  ? -------------------------- update notice --------------------------

router.route("/update-notice/:noticeId").put(announcementAttachmentUploder.fields(
  [
        {
           name : "attachment",
           maxCount : 1,
        }
  ]
),updateNotice)

//  ? -------------------------- get all  notice --------------------------

router.route("/get-all-notices").get(getAllNotice)

//  ? -------------------------- delete notice --------------------------

router.route("/delete-notice/:noticeId").delete(deleteNotice)



export default router;

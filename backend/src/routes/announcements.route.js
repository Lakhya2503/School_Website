import { Router } from 'express'
import { createNewAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement } from '../controller/announcements.controller.js';
import { announcementAttachmentUploder } from '../middleware/multer.middleware.js';
import { createContentLimiter } from '../middleware/rateLimiter.middleware.js';

const router = Router()

// ? -------------- creating new announcement ----------------

router.route("/new-annoucement").post(createContentLimiter, announcementAttachmentUploder.fields(
  [
        {
           name : "attachment",
           maxCount : 1,
        }
  ]
) ,createNewAnnouncement)

// ? -------------- update announcement ----------------

router.route("/update-annoucement/:announcementId").post(createContentLimiter, announcementAttachmentUploder.fields(
  [
    {
      name : "attachment",
      maxCount : 1
    }
  ]
) ,updateAnnouncement)

// ? -------------- get-all  announcements ----------------

router.route("/get-all-announcements").get(getAllAnnouncements)

// ? -------------- delete announcement ----------------

router.route("/delete-announcements/:announcementId").delete(deleteAnnouncement)


export default router;

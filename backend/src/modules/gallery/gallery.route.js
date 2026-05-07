
import { Router } from 'express'
import { addGalleryImage, deleteGalleryImage, getAllGallaryImage, updateGallary } from './gallery.controller.js';
import { gallerytUploder } from '../../middleware/multer.middleware.js';


const router = Router()

//  ? ----------------- add new gallery -----------------

router.route("/add-new-image").post(gallerytUploder.fields(
  [
        {
           name : "attachment",
           maxCount : 1,
        }
  ]
),addGalleryImage)

//  ? ----------------- update gallery -----------------

router.route("/update-image/:imageId").put(gallerytUploder.fields(
  [
        {
           name : "attachment",
           maxCount : 1,
        }
  ]
),updateGallary)

//  ? ----------------- get all gallery image -----------------

router.route("/get-all-images").get(getAllGallaryImage)

//  ? ----------------- delete gallery image -----------------

router.route("/delete-image/:imageId").delete(deleteGalleryImage)

export default router;

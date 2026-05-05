import mongoose from 'mongoose'
import { announcementCategory, announcementCategoryEnums } from '../utils/constant.js';

const announcementSchema = new mongoose.Schema(
  {
      title : {
        type : String,
        required : true
      },
      category : {
        type : String,
        default : announcementCategory.GENERAL,
        enum : announcementCategoryEnums
      },
      date : {
        type : Date,
        default : Date.now()
      },
      content : {
        type : String,
        default : ""
      },
      attachment : {
        type : String
      }
   },
  { timestamps : true }
)


const Announcement = mongoose.model("Announcement" , announcementSchema)

export default Announcement;

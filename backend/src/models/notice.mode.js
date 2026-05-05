import mongoose from 'mongoose'
import { noticeCategory, noticeCategoryEnums } from '../utils/constant.js';

const noticeSchema = new mongoose.Schema(
    {
          title : {
            type : String,
            required : true
          },
          category : {
            type : String,
            required : true,
            default : noticeCategory.SCHOOL_NOTICE,
            enum : noticeCategoryEnums
          },
          content : {
            type : String,
            required : true
          },
          date : {
            type : Date,
            required : true
          },
          attachmentUrl : {
            type : String,
          }
    } ,
    { timestamps : true }
)

const Notice = mongoose.model("Notice", noticeSchema)
export default Notice;

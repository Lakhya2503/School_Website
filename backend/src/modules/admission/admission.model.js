import mongoose from 'mongoose'
import { admissionGrade, admissionGradeEnums, admissionStatus, admissionStatusEnums, emailRegex } from '../../utils/constant.js';

const admissionSchema = new mongoose.Schema(
    {
          parentName : {
            type : String,
            required : true
          },
          childName : {
            type : String,
            required : true
          },
          applyingForGrade : {
              type : String,
              required : true,
              default : admissionGrade.CLASS_VI,
              enum : admissionGradeEnums
          },
         email: {
            type :  String,
            required: [true, "Email is required"],
            lowercase: true,
            match : emailRegex,
            unique:true
          },
          phon : {
            type : String,
            required : true,
            unique : true
          },
          additionalMessage : {
            type : String,
            required : true
          },
          isReview : {
            type : Boolean,
            default : false
          },
          status : {
            type : String,
            required : true,
            default : admissionStatus.PENDING,
            enum : admissionStatusEnums
          }
    },
    {
        timestamps : true
    }
)


const Admission = mongoose.model("Admission", admissionSchema)
export default Admission;

import mongoose from "mongoose";


const feeStructureSchema = new mongoose.Schema(
    {
        classOrGrade : {
          type : String,
          required : true,
        },
        tutionFee : {
          type : Number,
          required : true
        },
        admissionFee : {
          type : Number,
          required : true
        },
        examFee : {
          type : Number,
          required : true
        },
        otherCharges : {
          type : Number,
          required : true
        }
    },
    { timestamps : true }
)

const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema)
export default FeeStructure

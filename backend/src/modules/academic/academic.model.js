
import mongoose from "mongoose";

const acadimicSchema = new mongoose.Schema(
  {
  curriculumOverview   :{
    type : String,
    required : true,
  },
  teachingMethodology  :{
      type : String,
      required : true
  },
  departmentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Department"
  }
},
  { timestamps : true }
)


const Academics = mongoose.model("Academics", acadimicSchema)
export default Academics;

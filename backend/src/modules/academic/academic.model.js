import mongoose from "mongoose";

const curriculumOverviewSchema = new mongoose.Schema(
  {
          classRang : {
            type : String,
            required : true
          },
          numberOfLabes : {
            type : Number,
            required : true
          },
          bordOrCurriculum : {
            type : String,
            required : true
    }
  } , {
      timestamps : true
  }
)

const teachingMethodologySchema = new mongoose.Schema(
  {
          curriculumOverview : {
            type : String,
            required : true
          },
          techiningMethodology : {
            type : String,
            required : true
    }
  } , {
      timestamps : true
  }
)

const departmentSchema = new mongoose.Schema(
  {
          departmentName : {
            type : String,
            required : true
          },
          description : {
            type : String,
            required : true
          }
  } , {
      timestamps : true
  }
)

const acadimicSchema = new mongoose.Schema(
  {
  curriculumOverview :  curriculumOverviewSchema,
  teachingMethodology : teachingMethodologySchema,
  department : [departmentSchema]
},
  { timestamps : true }
)



const Academics = mongoose.model("Academics", acadimicSchema)
export default Academics;

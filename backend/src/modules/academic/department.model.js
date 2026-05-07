import mongoose from "mongoose"


const departmentSchema = new mongoose.Schema(
  {
      departments : {
          departmentName : {
            type : String,
            required : true
          },
          description : {
            type : String,
            required : true
          }
    }
  } , {
      timestamps : true
  }
)

const Department  =  mongoose.model("Department", departmentSchema)
export default Department;

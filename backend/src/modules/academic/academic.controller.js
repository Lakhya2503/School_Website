import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Academics from "./academic.model.js";

const newAcademics = asyncHandler(async (req, res) => {
  const { curriculumOverview, teachingMethodology, department } = req.body;

  console.log({
    curriculumOverview, teachingMethodology, department
  });

   if(Object.values(curriculumOverview).some((field)=> field === "" ) ){
        throw new ApiError(404, "Curriculum Overview all fields required")
  }

  if(Object.values(teachingMethodology).some((field)=> field === "" ) ){
        throw new ApiError(404, "Teaching Methodology all fields required")
  }

  let departmentArray = [];
  if (department || Object.values(department).length > 0) {
    departmentArray.push(department);
  } else {
    departmentArray = [];
  }

  const acadims = await Academics.create({
    curriculumOverview,
    teachingMethodology,
    department : departmentArray,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, acadims, "New academic record created successfully"),
    );
});

const getAllAcademics = asyncHandler(async (req, res) => {
  const academics = await Academics.find();
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        academics,
        "Fetched all academic records successfully",
      ),
    );
});


const updateCurriculumOverview = asyncHandler(async(req,res)=>{

  const { classRang, numberOfLabes, bordOrCurriculum } = req.body

  const updateData = {}

  if(classRang) updateData.classRang = classRang
  if(numberOfLabes) updateData.numberOfLabes = numberOfLabes
  if(bordOrCurriculum) updateData.bordOrCurriculum = bordOrCurriculum

  if(Object.values(updateData).lenght === 0) {
     throw new ApiError(400, "minimum one field can enter")
  }

  const updateCurriculumOveriew = await Academics.findOneAndUpdate(
    {},
    {
        $set : {
          curriculumOverview : updateData
        }
    },
    {
      runValidators : true,
      new : true
    }
  )


    if(!updateCurriculumOveriew) {
      throw new ApiError(404, "Curriculum Overiew didn't updated")
    }


  return res.status(200).json(new ApiResponse(200, {}, "Update Curriculum Overview Successfully"))
})



const updateDepartment = asyncHandler(async (req, res) => {
  const { departmentName, description } = req.body;
  const { departmentId } = req.params;

  const departmentUpdateData = {};

  if (departmentName)
    departmentUpdateData["department.departmentName"] = departmentName;
  if (description) departmentUpdateData["department.description"] = description;

  const department = await Academics.findOneAndUpdate(
    { "department._id": departmentId },
    { $set: departmentUpdateData },
    { new: true },
  );

  if (!department) {
    throw new ApiError(400, "Department not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, department, "Department updated successfully"));
});





const getAcademicById = asyncHandler(async (req, res) => {
  const { academicId } = req.params;
  const academic = await Academics.findById(academicId);

  if (!academic) {
    throw new ApiError(404, "Academic record not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, academic, "Fetched academic record successfully"),
    );
});


const deleteAcademic = asyncHandler(async (req, res) => {
  const { academicId } = req.params;
  const academic = await Academics.findByIdAndDelete(academicId);

  if (!academic) {
    throw new ApiError(404, "Academic record not found");
  }

  return res
    .status(204)
    .json(new ApiResponse(204, {}, "Academic record deleted successfully"));
});

export {
  deleteAcademic,
  getAcademicById,
  getAllAcademics,
  newAcademics,
  updateDepartment,
};

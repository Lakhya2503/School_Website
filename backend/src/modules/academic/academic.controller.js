import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Academics from "./academic.model.js";

const newAcademics = asyncHandler(async (req, res) => {
  const { curriculumOverview, teachingMethodology, department } = req;

  let campusAndFacility = [];

  if (campusFacility && campusFacility.lenth > 0) {
    campusAndFacility.push(campusAndFacility);
  } else {
    campusAndFacility = [];
  }

  const acadims = await Academics.create({
    curriculumOverview,
    teachingMethodology,
    department,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, acadims, "New academic record created successfully"),
    );
});


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

import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "./../../utils/asyncHandler.js";
import Academics from "./academic.model.js";

const addNewAcadimecs = asyncHandler(async (req, res) => {
  const { curriculumOverview, teachingMethodology, department } = req.body;

  if (
    (!curriculumOverview && !curriculumOverview.classRang) ||
    !curriculumOverview.classRang ||
    !curriculumOverview.bordOrCurriculum
  ) {
    throw new ApiError(400, "curriculumOverview all fields are required");
  }

  if (
    (!teachingMethodology && !teachingMethodology.curriculumOverview) ||
    !teachingMethodology.techiningMethodology
  ) {
    throw new ApiError(400, "teachingMethodology all fields are required");
  }

  let departmentArray = [];

  if (
    (department && department.length > 0 && department.departmentName) ||
    department.description
  ) {
    departmentArray.push(department);
  } else {
    department = departmentArray;
  }

  const createNewAcdemics = await Academics.create({
    curriculumOverview: curriculumOverview,
    teachingMethodology: teachingMethodology,
    department: departmentArray,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        createNewAcdemics,
        "new academics create successfully",
      ),
    );
});

const updateCurriculumOverview =  asyncHandler(async (req, res) => {

  // ? -- add the update curriculums method

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateCurriculeme, "Curriculum update successfully"),
    );
});

const updateTeachingMethodology = await asyncHandler(async (req, res) => {
  // ? -- add the update TeachingMethodology method

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateCurriculeme,
        "update Teaching Methodology successfully",
      ),
    );
});

const updateDepartment = await asyncHandler(async (req, res) => {
  // ? -- add the update Department method

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateCurriculeme, "Update Department successfully"),
    );
});

const deleteDepartment = await asyncHandler(async (req, res) => {
  // ? -- add the delete department method

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateCurriculeme, "delete Department successfully"),
    );
});

export {
  addNewAcadimecs,
  updateCurriculumOverview,
  updateDepartment,
  updateTeachingMethodology,
  deleteDepartment,
};

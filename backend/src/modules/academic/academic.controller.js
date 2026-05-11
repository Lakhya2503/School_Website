import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import Academics from "./academic.model.js";

const newAcademics = asyncHandler(async (req, res) => {
  const { curriculumOverview, teachingMethodology, department } = req.body;

  console.log({
    curriculumOverview,
    teachingMethodology,
    department,
  });

  if (Object.values(curriculumOverview).some((field) => field === "")) {
    throw new ApiError(404, "Curriculum Overview all fields required");
  }

  if (Object.values(teachingMethodology).some((field) => field === "")) {
    throw new ApiError(404, "Teaching Methodology all fields required");
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
    department: departmentArray,
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

const updateCurriculumOverview = asyncHandler(async (req, res) => {
  const { classRang, numberOfLabes, bordOrCurriculum } = req.body;

  const updateData = {};

  if (classRang) updateData.classRang = classRang;
  if (numberOfLabes) updateData.numberOfLabes = numberOfLabes;
  if (bordOrCurriculum) updateData.bordOrCurriculum = bordOrCurriculum;

  if (Object.values(updateData).lenght === 0) {
    throw new ApiError(400, "minimum one field can enter");
  }

  const updateCurriculumOveriew = await Academics.findOneAndUpdate(
    {},
    {
      curriculumOverview: updateData,
    },
    {
      runValidators: true,
      new: true,
    },
  );

  if (!updateCurriculumOveriew) {
    throw new ApiError(404, "Curriculum Overiew didn't updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateCurriculumOveriew.curriculumOverview,
        "Update Curriculum Overview Successfully",
      ),
    );
});

const updateTeachingMethodology = asyncHandler(async (req, res) => {
  const { techiningMethodology, curriculumOverview } = req.body;

  const updateData = {};

  if (techiningMethodology)
    updateData.techiningMethodology = techiningMethodology;
  if (curriculumOverview) updateData.curriculumOverview = curriculumOverview;

  if (Object.values(updateData).lenght === 0) {
    throw new ApiError(400, "minimum one field can enter");
  }

  const updateTeachingMethodology = await Academics.findOneAndUpdate(
    {},
    {
      teachingMethodology: updateData,
    },
    {
      runValidators: true,
      new: true,
    },
  );

  if (!updateTeachingMethodology) {
    throw new ApiError(404, "Curriculum Overiew didn't updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateTeachingMethodology.teachingMethodology,
        "Update Curriculum Overview Successfully",
      ),
    );
});

const addNewDepartment = asyncHandler(async (req, res) => {
  const { departmentName, description } = req.body;

  const department = await Academics.findOneAndUpdate(
    {},
    {
      $push: {
        department: {
          departmentName: departmentName,
          description: description,
        },
      },
    },
    {
      runValidators: true,
      new: true,
    },
  );

  if (!department) {
    throw new ApiError(400, "can't add new Department");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        department.department,
        "new Department create successfully",
      ),
    );
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { departmentName, description } = req.body;
  const { departmentId } = req.params;

  const updateData = {};

  if (departmentName) updateData.departmentName = departmentName;
  if (description) updateData.description = description;

  // if (Object.values(updateData).length === 0) {
  //   throw new ApiError(400, "At least one field is required to update");
  // }

  const department = await Academics.findOneAndUpdate(
    { "department._id": departmentId },
    { $set: updateData },
    { new: true, runValidators: true },
  );

  if (!department) {
    throw new ApiError(400, "Department not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        department.department,
        "Department updated successfully",
      ),
    );
});

const deleteDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;

  const department = await Academics.findOne({
    "department._id": departmentId,
  });

  console.log("department", department);

  if (!department) {
    throw new ApiError(404, "Department  not found");
  }

  await Academics.findOneAndUpdate(
    {},
    {
      $pull: {
        department: { _id: departmentId },
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Delete Department successfully"));
});

export {
  addNewDepartment,
  deleteDepartment,
  getAllAcademics,
  newAcademics,
  updateCurriculumOverview,
  updateDepartment,
  updateTeachingMethodology,
};

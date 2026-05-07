import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Academics from '../models/academic.model.js';
import ApiError from '../../utils/ApiError.js';
import Department from '../models/department.model';


const newAcadimics = asyncHandler(async(req,res)=>{

    const { curriculumOverview, teachingMethodology, deparment } = req.body

    const academicsData = {
          curriculumOverview,
          teachingMethodology,
    }

    if(deparment !== undefined ) {
        const department = await Department.create({
              departments : deparment
         })

         academicsData.departmentId  = department?._id
    }

    const academics = await Academics.create(academicsData)


    if(!academics) {
      throw new ApiError(400, "Bad requiest")
    }


    return res.status(201).json(new ApiResponse(201, academics , "Create new acadimics"))
})

const updateDepartment = asyncHandler(async(req,res)=>{

  const { departmentName, description } = req.body
  const  { departmentId } = req.params

   const departmentUpdateData = {}

    if(departmentName)  departmentUpdateData.departmentName = departmentName
    if(description)  departmentUpdateData.description = description

  const department = await Department.findByIdAndUpdate(
      departmentId, {
          $set : departmentUpdateData
      }
  )

  if(!department) {
      throw new ApiError(400, "department can't found")
  }


  return res.status(200).json(new ApiResponse(200, {}, "Department update successfully"))
})





export {
  newAcadimics,
  updateDepartment
}

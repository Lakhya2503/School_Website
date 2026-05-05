import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Admission from '../models/admission.model.js'
import ApiError from '../utils/ApiError';


const newAdmission = asyncHandler(async (req,res) => {

    const {
      parentName,
      childName,
      email,
      phon,
      aditionalMessage
     } = req.body

     const admissionData = {
          parentName,
          childName,
          email,
          phon
     }

     if(aditionalMessage)  admissionData.aditionalMessage = aditionalMessage


     const admission = await Admission.create(admissionData)

     if(!admission) {
      throw new ApiError(400, "Admission not created")
     }


  return res.status(201).json(new ApiResponse(201, admission, "New Admission"))
})

const updateAdmissionStatus = asyncHandler(async(req,res)=>{

  const { admissionId } = req.params

    const {
        status
    } = req.body

    if(status) {
      throw new ApiError(400, "status are required")
    }

    const admission = await Admission.findById(admissionId)

    if(!admission) {
      throw new ApiError(400, "Admission not found")
    }

    admission.status = status

    const updateAdmissionStatus = await Admission.findByIdAndUpdate(admission._id, {
      $set : {
        status
      }
    },  { new: true, runValidators: true })


    if(!updateAdmissionStatus) {
      throw new ApiError(400, "Admission didn't found")
    }


  return res.status(200).json(new ApiResponse(200, {}, "Admission updated successfully"))
})

const getAllAdmissions = asyncHandler(async(req,res)=>{

  const allAdmissions = await Admission.find().lean()

  return res.status(200).json(new ApiResponse(200, allAdmissions, "fetch all admissions successfully"))
})

const deleteAdmission = asyncHandler(async(req,res)=>{

  const { admissionId } = req.params

  const admission = await Admission.findById(admissionId)

  if(!admission) {
    throw new ApiError(400, "Admission can't found")
  }

    await Admission.findByIdAndDelete(admission._id)

  return res.status(200).json(new ApiResponse(200, {}, "Admission delete successfully"))

})



export {
  newAdmission,
  updateAdmissionStatus,
  deleteAdmission,
  getAllAdmissions
}

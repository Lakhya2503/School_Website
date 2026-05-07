import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import Admission from './admission.model.js'
import ApiError from '../../utils/ApiError.js';
import { admissionStatus } from '../../utils/constant.js';


const newAdmission = asyncHandler(async (req,res) => {

    const {
      parentName,
      childName,
      email,
      phon,
      additionalMessage,
      applyingForGrade
     } = req.body

     if([parentName,childName,email,phon,applyingForGrade].some((field)=> String(field) === "")) {
        throw new ApiError(400, "all field required")
      }

     const admissionData = {
          parentName,
          childName,
          email,
          applyingForGrade,
          phon,
          isReview : false,
          status : admissionStatus.PENDING
     }

     if(additionalMessage)  admissionData.additionalMessage = additionalMessage

     const admission = await Admission.create(admissionData)

     if(!admission) {
      throw new ApiError(400, "Admission not created")
     }


  return res.status(201).json(new ApiResponse(201, admission, "New Admission"))
})

const updateAdmissionReview = asyncHandler(async(req,res)=>{

  const { admissionId } = req.params

    const admission = await Admission.findById(admissionId)

    if(!admission) {
      throw new ApiError(400, "Admission not found")
    }

    const updateAdmissionStatus = await Admission.findByIdAndUpdate(admission._id, {
      $set : {
        isReview : true
      }
    },  { new: true, runValidators: true })


    if(!updateAdmissionStatus) {
      throw new ApiError(400, "Admission didn't found")
    }


  return res.status(200).json(new ApiResponse(200, {}, "Admission Reviewed"))
})

const updateAdmissionStatus = asyncHandler(async(req,res)=>{

  const { admissionId } = req.params

    const {
        status
    } = req.body

    if(!status) {
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


  return res.status(200).json(new ApiResponse(200, {}, "Admission Status updated successfully"))
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
  updateAdmissionReview,
  updateAdmissionStatus,
  deleteAdmission,
  getAllAdmissions
}

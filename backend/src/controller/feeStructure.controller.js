import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import FeeStructure from '../models/feeStructure.model.js';

const addClassFees = asyncHandler(async(req,res)=>{

  const {
      classOrGrade,
      tutionFee,
      admissionFee,
      examFee,
      otherCharges
  } = req.body

  if(!classOrGrade,!tutionFee,!admissionFee,!examFee,!otherCharges) {
    throw new ApiError(404, "all Filed are required")
  }

      const classFeeData = {
        classOrGrade,
        tutionFee,
        admissionFee,
        examFee,
        otherCharges
    }

  if(typeof tutionFee === "string") {
    classFeeData.tutionFee = Number(tutionFee)
  }
  if(typeof admissionFee === "string")  {
    classFeeData.admissionFee = Number(admissionFee)
  }
  if(typeof examFee === "string")  {
    classFeeData.examFee = Number(examFee)
  }

  if(typeof otherCharges === "string") {
    classFeeData.otherCharges=  Number(otherCharges)
  }

    const createClassFee = await FeeStructure.create(classFeeData)

    if(!createClassFee) {
      throw new ApiError(404, "class fee Didn' create")
    }

  return res.status(201).json(new ApiResponse(201, createClassFee, "Add New Class Fees Successfully"))
})

const updateClassFee = asyncHandler(async(req,res)=>{

  const { classId } = req.params
  const {
      classOrGrade,
      tutionFee,
      admissionFee,
      examFee,
      otherCharges
  } = req.body

  const classFeesStructure = await FeeStructure.findById(classId)

  if(!classFeesStructure) {
    throw new ApiError(404, "class fee structure didn't find")
  }

      const updateData = {}

        if(classOrGrade) updateData.classOrGrade = classOrGrade

        if(tutionFee && typeof tutionFee === "number"  || tutionFee && typeof tutionFee === "string" ) updateData.tutionFee = Number(tutionFee)

        if(admissionFee && typeof admissionFee === "number" || admissionFee && typeof admissionFee === "string") updateData.admissionFee = Number(admissionFee)
        if(admissionFee && typeof admissionFee === "number" || examFee && typeof examFee === "string") updateData.examFee = Number(examFee)

        if(otherCharges && typeof otherCharges === "number" || otherCharges && typeof otherCharges === "string") updateData.otherCharges=  Number(otherCharges)


    const updateFeeStructure = await FeeStructure.findByIdAndUpdate(
      classId,
      {
         $set : updateData
      },
      { new: true, runValidators: true }
    )

    if(!updateFeeStructure) {
      throw new ApiError(404, "fee structure didn't update")
    }

 return res.status(200).json(new ApiResponse(200, updateFeeStructure, "Update Fee Structure Successfully"))

})

const getFullOfFeeStructure = asyncHandler(async(_,res)=>{

  const getfullstructure = await FeeStructure.find().lean()

  return res.status(200).json(new ApiResponse(200, getfullstructure, "fetch full of fee structure successfully"))
})

const deleteFeeStructreClass = asyncHandler(async(req,res)=>{

    const { classId } = req.params

    const classFeeStructre = await FeeStructure.findById(classId)

    if(!classFeeStructre) {
       throw new ApiError(404, "can't find Class Fee Structure")
    }

    await FeeStructure.findByIdAndDelete(classId)

  return res.status(200).json(new ApiResponse(200, {}, "Fee Structure delete succesfully"))
})


export {
  addClassFees,
  updateClassFee,
  getFullOfFeeStructure,
  deleteFeeStructreClass
}

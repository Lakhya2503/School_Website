import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Inquirie from '../models/inquirie.model.js';
import ApiError from '../utils/ApiError.js';

const newInquirie = asyncHandler(async(req,res)=>{
    const { fullName, email, subject, message} = req.body

    const inquirieData = {
        fullName, email,subject, message, isRead : false
    }

    const inquirie = await Inquirie.create(inquirieData)

    if(!inquirie) {
      throw new ApiError(404, "Inquirie can't create plese again some time")
    }

    return res.status(201).json(new ApiResponse(201, newInquirie, "send Inquirie"))

})

const updateInquirie = asyncHandler(async(req,res)=>{

  const { inquirieId } = req.params

  const inquirie = await Inquirie.findById(inquirieId)

  if(!inquirie) {
    throw new ApiError(404, "Inquired didn't find")
  }

  await Inquirie.findByIdAndUpdate(inquirieId, {
    $set : {
        isRead : true
    }
  })

  return res.status(200).json(new ApiResponse(200, {}, "Quirie read"))
})

const getInquiries = asyncHandler(async(req,res)=>{

  const  inquiries = await Inquirie.find().lean()

  /*
      TODO : ADD A ERROR FOR WHEN IQNIRIE NOT FOUND
  */

  return res.status(200).json(new ApiResponse(200, inquiries, "fetch all inquiries successfully"))
})

const deleteInquirie = asyncHandler(async(req,res)=>{

  const { inquirieId } = req.params

  const inquirie = await Inquirie.findById(inquirieId)

  if(!inquirie) {
    throw new ApiError(404, 'Inquirie not found')
  }

  await Inquirie.findByIdAndDelete(inquirie._id)

  return res.status(200).json(new ApiResponse(200, {}, "Inquirie deleted successfully"))
})


export {
  newInquirie,
  getInquiries,
  deleteInquirie,
  updateInquirie
}

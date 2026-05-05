import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Notice from '../models/notice.mode.js';
import ApiError from '../utils/ApiError.js';
import { noticeCategoryEnums } from '../utils/constant.js';
import uploadCloudinary from '../utils/cloudinary.js';


const newNotice = asyncHandler(async(req,res)=>{

  const { title, category, content, date, attachmentUrl } = req.body

  const noticeData = {
      title,
      category,
      content,
      date
  }

    if ([title, category, content, date].some(
        (field) => !field || field.toString().trim() === ""
      )) {
        throw new ApiError(400, "All fields are required");
      }

  if(category && !noticeCategoryEnums.includes(category)) {
    throw new ApiError(400, "Add meaningfull category")
  }

  if(attachmentUrl) noticeData.attachmentUrl = attachmentUrl




      if(req.files) {
            const { attachment } = req.files
            if(attachment) {
              const attachmentPath = attachment[0].path
              if(!attachmentPath) {
                throw new ApiError(404, "Attachement can't find")
              }
              const attachmentLink = await uploadCloudinary(attachmentPath)

              if(!attachmentLink) {
                throw new ApiError(404,"didn't upload pdf")
              }
                noticeData.attachmentUrl = attachmentLink.secure_url
            }
      }

        const notice = await Notice.create(noticeData)

        if(!notice) {
          throw new ApiError(404, "Notice can't posted ")
        }


    return res.status(201).json(new ApiResponse(201, {}, "New Notice posted successfully"))
})

const updateNotice = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;
  const { title, category, content, date, attachmentUrl } = req.body;

  const updateData = {};

  if (title) updateData.title = title;
  if (category) {
    if (!noticeCategoryEnums.includes(category)) {
      throw new ApiError(400, "Invalid category");
    }
    updateData.category = category;
  }
  if (content) updateData.content = content;

  if (date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new ApiError(400, "Invalid date format");
    }
    updateData.date = parsedDate;
  }

  if (attachmentUrl) updateData.attachmentUrl = attachmentUrl;

  // File upload
  if (req.files?.attachment?.length > 0) {
    const attachmentPath = req.files.attachment[0].path;

    const uploaded = await uploadCloudinary(attachmentPath);

    if (!uploaded) {
      throw new ApiError(500, "File upload failed");
    }

    updateData.attachmentUrl = uploaded.secure_url;
  }

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }

  const updatedNotice = await Notice.findByIdAndUpdate(
    noticeId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedNotice) {
    throw new ApiError(404, "Notice not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedNotice, "Notice updated successfully")
  );
});


const getAllNotice = asyncHandler(async(req,res)=>{

    const allNotice = await Notice.find().lean()

    return res.status(200).json(new ApiResponse(200, allNotice, "Notice fetch Succesfully"))
})

const deleteNotice = asyncHandler(async(req,res)=>{

     const { noticeId } = req.params

     const notice = await Notice.findById(noticeId)

     if(!notice) {
        throw new ApiError(404, "Notice not found")
      }

      await Notice.findByIdAndDelete(notice._id)

  return res.status(200).json(new ApiResponse(200, {}, 'notice delete successfully'))
})


export {
  newNotice,
  updateNotice,
  getAllNotice,
  deleteNotice
}

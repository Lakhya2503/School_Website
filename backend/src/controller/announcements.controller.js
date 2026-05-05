import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Announcement from '../models/announcements.model.js';
import ApiError from '../utils/ApiError.js';
import { announcementCategoryEnums } from '../utils/constant.js';
import uploadCloudinary from '../utils/cloudinary.js';


const createNewAnnouncement = asyncHandler(async(req,res)=>{

    const { title, category, date, content, attachmentLink } = req.body

    const parsedDate = new Date(date);

    const announcementData = {
      title,
      category,
      date : parsedDate,
      content
    }

    if(!announcementCategoryEnums.includes(category)) {
      throw new ApiError(404, "Category is not found")
    }

    if(attachmentLink) {
      announcementData.attachment = attachmentLink
    }


    if(req.files) {
          const { attachment } = req.files
          if(attachment) {
            const attachmentPath = attachment[0].path
            if(!attachmentPath) {
              throw new ApiError(404, "Attachement can't find")
            }
            const attachmentLink = await uploadCloudinary(attachmentPath)

            if(!attachmentLink) {
              throw new ApiError(404,"didn't upload image")
            }
              announcementData.attachment = attachmentLink.secure_url
          }
    }

    const announcements = await Announcement.create(announcementData)

    if(!announcementData) {
      throw new ApiError(501)
    }


  return res.status(201).json(new ApiResponse(201, announcements, "New Announcement create successfully"))
})

const updateAnnouncement = asyncHandler(async (req, res) => {
  const { announcementId } = req.params;
  const updateData = { ...req.body };

  if (!updateData || Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No data provided to update");
  }


  if (updateData.date) {
    const parsedDate = new Date(updateData.date);


    if (isNaN(parsedDate.getTime())) {
      throw new ApiError(400, "Invalid date format. Use YYYY-MM-DD");
    }

    updateData.date = parsedDate;
  }

   if(req.files) {
          const { attachment } = req.files
          console.log("attachment", attachment)
          if(attachment) {
            const attachmentPath = attachment[0].path
            if(!attachmentPath) {
              throw new ApiError(404, "Attachement can't find")
            }
            const attachmentLink = await uploadCloudinary(attachmentPath)
            if(!attachmentLink) {
              throw new ApiError(404,"didn't upload image")
            }
              updateData.attachment = attachmentLink.url
          }
    }

  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    announcementId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedAnnouncement) {
    throw new ApiError(404, "Announcement not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedAnnouncement, "Announcement updated successfully")
  );
});

const getAllAnnouncements = asyncHandler(async(req,res)=>{

    const allAnnouncement = await Announcement.find().lean()

    return res.status(200).json(new ApiResponse(200, allAnnouncement, "fetch all announcements"))

})

const deleteAnnouncement = asyncHandler(async(req,res)=>{

   const { announcementId } =  req.params

    await Announcement.findByIdAndDelete(announcementId)


    return res.status(204).json(new ApiResponse(204, {}, "Announcement Delete successfully"))
})


export {
   createNewAnnouncement,
   updateAnnouncement,
   getAllAnnouncements,
   deleteAnnouncement
}

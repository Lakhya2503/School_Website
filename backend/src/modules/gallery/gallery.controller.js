import Gallery from "./gallery.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import uploadCloudinary from "../../utils/cloudinary.js";

const addGalleryImage = asyncHandler(async (req, res) => {
  const { imageLable, category, attachmentLink } = req.body;

  const imageData = {
    imageLable,
    category,
  };

  if (!imageLable || !category) {
    throw new ApiError(400, "Image lable and image category are required");
  }

  if (attachmentLink) {
    imageData.imageUrl = attachmentLink;
  }

  if (req.files) {
    const { attachment } = req.files;
    if (attachment) {
      const attachmentPath = attachment[0].path;
      if (!attachmentPath) {
        throw new ApiError(404, "Attachement can't find");
      }
      const attachmentLink = await uploadCloudinary(attachmentPath);

      if (!attachmentLink) {
        throw new ApiError(404, "didn't upload image");
      }
      imageData.imageUrl = attachmentLink.secure_url;
    }
  }

  const createImage = await Gallery.create(imageData);

  if (!createImage) {
    throw new ApiError(400, "Image can't create");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createImage, "add new image successfully"));
});

const updateGallary = asyncHandler(async (req, res) => {
  const { imageLable, category, attachmentLink } = req.body;

  const { imageId } = req.params;

  const updateData = {};

  if (imageLable) updateData.imageLable = imageLable;
  if (category) updateData.category = category;

  if (attachmentLink) {
    updateData.imageUrl = attachmentLink;
  }

  if (req.files) {
    const { attachment } = req.files;
    if (attachment) {
      const attachmentPath = attachment[0].path;
      if (!attachmentPath) {
        throw new ApiError(404, "Attachement can't find");
      }
      const attachmentLink = await uploadCloudinary(attachmentPath);

      if (!attachmentLink) {
        throw new ApiError(404, "didn't upload image");
      }
      updateData.imageUrl = attachmentLink.secure_url;
    }
  }

  const updateImage = await Gallery.findByIdAndUpdate(
    imageId,
    {
      $set: updateData,
    },
    { new: true, runValidators: true },
  );

  if (!updateImage) {
    throw new ApiError(400, "Image can't update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updateImage, "add new image successfully"));
});

const getAllGallaryImage = asyncHandler(async (req, res) => {
  const getGallery = await Gallery.find().lean();

  return res
    .status(200)
    .json(new ApiResponse(200, getGallery, "Fetch gallery successfully"));
});

const deleteGalleryImage = asyncHandler(async (req, res) => {
  const { imageId } = req.params;

  const image = await Gallery.findById(imageId);

  if (!image) {
    throw new ApiError(404, "Image can't find");
  }

  await Gallery.findByIdAndDelete(imageId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Image delete successfully"));
});

export {
  addGalleryImage,
  deleteGalleryImage,
  getAllGallaryImage,
  updateGallary,
};

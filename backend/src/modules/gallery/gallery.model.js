import mongoose from "mongoose";
import { galleryCategory, galleryCategoryEnums } from "../../utils/constant.js";

const gallarySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      requird: true,
    },
    imageLable: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: galleryCategory.CAMPUS,
      enum: galleryCategoryEnums,
    },
  },
  {
    timestamps: true,
  },
);

const Gallery = mongoose.model("Gallery", gallarySchema);
export default Gallery;

import path from 'path';
import multer from 'multer';
import fs from 'fs';

const publicDir = path.join(process.cwd(), "public");
const avatarDir = path.join(publicDir, "avatar");
const annoucementsAttachmentsDir = path.join(publicDir, "annoucementsAttachments");
const noticeAttachmentsDir = path.join(publicDir, "noticeAttachments");
const galleryImagesDir = path.join(publicDir, "galleryImages");


const dirs = [publicDir,avatarDir,annoucementsAttachmentsDir,noticeAttachmentsDir,galleryImagesDir];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const uploader = (dir) => {
    const commanStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const uniSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
            const cleanName = file.originalname.replace(/\s+/g, "_");
            cb(null, `${uniSuffix}-${cleanName}`);
        }
    })
    return commanStorage
}

export const announcementAttachmentUploder = multer({
  storage: uploader(annoucementsAttachmentsDir),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const avatarUploder = multer({
  storage: uploader(avatarDir),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const gallerytUploder = multer({
  storage: uploader(galleryImagesDir),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const noticeAttachmentUploder = multer({
  storage: uploader(noticeAttachmentsDir),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

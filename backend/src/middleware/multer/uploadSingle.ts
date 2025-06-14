import multer from "multer";

export const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadSingle = multerUpload.single("image");

export { uploadSingle };



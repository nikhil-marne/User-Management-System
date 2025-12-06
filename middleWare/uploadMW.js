import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed!"));
  }
};

export const uploadMW = multer({
  storage,
  //fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 5MB
});

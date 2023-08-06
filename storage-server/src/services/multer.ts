import multer from "multer";
import sha1 from "sha1";
import { Request } from "express";
import { ServiceError } from "../models";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./images/${req.params._id}`);
  },
  filename: function (req, file, cb) {
    const fileType = file.mimetype.split("/")[1];
    cb(
      null,
      `${
        sha1(file.originalname).substring(0, 10) +
        sha1(new Date().toString().substring(0, 10))
      }.${fileType}`,
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(file.mimetype);
    const mimeType = fileTypes.test(file.originalname);
    if (extName && mimeType) {
      callback(null, true);
    } else {
      callback(new ServiceError("Only images are allowed.", {}));
    }
  },
});

export { upload };

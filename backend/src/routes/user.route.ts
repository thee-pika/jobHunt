import express from "express";
import {
  getUserDetails,
  updateAvatar,
  updateUser,
  uploadResume,
} from "../controller/user.controller";
import { uploadSingle } from "../middleware/multer/uploadSingle";
import { AuthMiddleware } from "../middleware/auth/AuthMiddleware";

export const userRoute = express();

userRoute.get("/", AuthMiddleware, getUserDetails);

userRoute.put("/avatar", AuthMiddleware, uploadSingle, updateAvatar);

userRoute.put("/resume", AuthMiddleware, uploadSingle, uploadResume);

userRoute.put("/update", AuthMiddleware, updateUser);

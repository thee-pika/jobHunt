import express from "express";
import { login, signUp } from "../controller/auth.controller";
import { uploadSingle } from "../middleware/multer/uploadSingle";
export const authRoute = express();

authRoute.post("/login", login);

authRoute.post("/signup", signUp);

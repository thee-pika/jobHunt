import express from "express";
import {
  deleteCompany,
  getAllCompanies,
  getCompanyDetails,
  getUserCompanies,
  registerCompany,
  updateCompanyDetails,
} from "../controller/company.controller";
import { uploadSingle } from "../middleware/multer/uploadSingle";
import { AuthMiddleware } from "../middleware/auth/AuthMiddleware";

export const companyRoute = express();

companyRoute.post("/register", AuthMiddleware, uploadSingle, registerCompany);

companyRoute.get("/", AuthMiddleware, getUserCompanies);

companyRoute.put("/:id", AuthMiddleware, uploadSingle , updateCompanyDetails);

companyRoute.delete("/:id", AuthMiddleware, deleteCompany);

companyRoute.get("/:id", AuthMiddleware, getCompanyDetails);

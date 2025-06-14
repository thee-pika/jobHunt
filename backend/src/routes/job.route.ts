import express from "express";
import {
  createApplication,
  createJobOpening,
  deleteJobOpening,
  getAllJobOpenings,
  getApplication,
  getJobOpening,
  getUserApplications,
  getUserJobOpening,
  updateApplicationStatus,
  updateJobOpening,
} from "../controller/job.controller";
import { AuthMiddleware } from "../middleware/auth/AuthMiddleware";

export const jobRoute = express();

jobRoute.post("/", AuthMiddleware, createJobOpening);

jobRoute.get("/", getAllJobOpenings);

jobRoute.get("/user", AuthMiddleware, getUserJobOpening);

jobRoute.get("/application", AuthMiddleware, getUserApplications);

jobRoute.post("/application", AuthMiddleware, createApplication);

jobRoute.put("/application/:id", AuthMiddleware, updateApplicationStatus);

jobRoute.get("/application/:id", AuthMiddleware, getApplication);

jobRoute.put("/:id", AuthMiddleware, updateJobOpening);

jobRoute.delete("/:id", AuthMiddleware, deleteJobOpening);

jobRoute.get("/:id", AuthMiddleware, getJobOpening);

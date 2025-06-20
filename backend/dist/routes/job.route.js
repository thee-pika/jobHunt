"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRoute = void 0;
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("../controller/job.controller");
const AuthMiddleware_1 = require("../middleware/auth/AuthMiddleware");
exports.jobRoute = (0, express_1.default)();
exports.jobRoute.post("/", AuthMiddleware_1.AuthMiddleware, job_controller_1.createJobOpening);
exports.jobRoute.get("/", job_controller_1.getAllJobOpenings);
exports.jobRoute.get("/user", AuthMiddleware_1.AuthMiddleware, job_controller_1.getUserJobOpening);
exports.jobRoute.get("/application", AuthMiddleware_1.AuthMiddleware, job_controller_1.getUserApplications);
exports.jobRoute.post("/application", AuthMiddleware_1.AuthMiddleware, job_controller_1.createApplication);
exports.jobRoute.put("/application/:id", AuthMiddleware_1.AuthMiddleware, job_controller_1.updateApplicationStatus);
exports.jobRoute.get("/application/:id", AuthMiddleware_1.AuthMiddleware, job_controller_1.getApplication);
exports.jobRoute.put("/:id", AuthMiddleware_1.AuthMiddleware, job_controller_1.updateJobOpening);
exports.jobRoute.delete("/:id", AuthMiddleware_1.AuthMiddleware, job_controller_1.deleteJobOpening);
exports.jobRoute.get("/:id", AuthMiddleware_1.AuthMiddleware, job_controller_1.getJobOpening);

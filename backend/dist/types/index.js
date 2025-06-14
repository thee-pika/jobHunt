"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCompanySchema = exports.signUpSchema = exports.loginSchema = exports.updateApplicationStatus = exports.applicationSchema = exports.jobOpeningSchema = void 0;
const v4_1 = require("zod/v4");
exports.jobOpeningSchema = v4_1.z.object({
    title: v4_1.z.string(),
    location: v4_1.z.string(),
    type: v4_1.z.enum(["fullTime", "PartTime", "Internship"]),
    salary: v4_1.z.number(),
    logo_url: v4_1.z.string(),
    company: v4_1.z.string(),
    skills: v4_1.z.string(),
    deadline: v4_1.z.string(),
});
exports.applicationSchema = v4_1.z.object({
    jobId: v4_1.z.string(),
    recruterId: v4_1.z.string(),
    resume: v4_1.z.string(),
    role: v4_1.z.string(),
    company: v4_1.z.string(),
});
exports.updateApplicationStatus = v4_1.z.object({
    status: v4_1.z.boolean(),
});
exports.loginSchema = v4_1.z.object({
    email: v4_1.z.string(),
    password: v4_1.z.string(),
});
exports.signUpSchema = v4_1.z.object({
    email: v4_1.z.string(),
    password: v4_1.z.string(),
    fullName: v4_1.z.string(),
    role: v4_1.z.enum(["User", "Admin", "Recruiter"]),
});
exports.addCompanySchema = v4_1.z.object({
    name: v4_1.z.string(),
    description: v4_1.z.string(),
    location: v4_1.z.string(),
});

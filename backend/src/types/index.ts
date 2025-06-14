import { z } from "zod/v4";

export const jobOpeningSchema = z.object({
  title: z.string(),
  location: z.string(),
  type: z.enum(["fullTime", "PartTime", "Internship"]),
  salary: z.number(),
  logo_url: z.string(),
  company: z.string(),
  skills: z.string(),
  deadline: z.string(),
});

export const applicationSchema = z.object({
  jobId: z.string(),
  recruterId: z.string(),
  resume: z.string(),
  role: z.string(),
  company: z.string(),
});

export const updateApplicationStatus = z.object({
  status: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const signUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  fullName: z.string(),
  role: z.enum(["User", "Admin", "Recruiter"]),
});

export const addCompanySchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
});

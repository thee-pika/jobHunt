import { Request, Response } from "express";
import { applicationSchema, jobOpeningSchema } from "../types";
import { prisma } from "../db/config";

const createJobOpening = async (req: Request, res: Response) => {
  try {
    const decoded = await jobOpeningSchema.safeParse(req.body);

    if (!decoded.success) {
      console.log("error", decoded.error);
      res.status(400).json({
        error: "Invalid job opening data",
        details: decoded.error,
      });
      return;
    }

    const {
      title,
      salary,
      location,
      skills,
      deadline,
      logo_url,
      company,
      type,
    } = decoded.data;

    const jobOpening = await prisma.jobPosting.create({
      data: {
        title,
        location,
        userId: req.user.id!,
        logo_url,
        salary,
        skills,
        deadline,
        company,
        type,
      },
    });
    console.log("jobOpening created ", jobOpening);
    res.status(201).json(jobOpening);
  } catch (error) {
    console.log("errror", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getAllJobOpenings = async (req: Request, res: Response) => {
  try {
    const jobOpenings = await prisma.jobPosting.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(201).json({ jobOpenings });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
      details: error,
    });
  }
};

const getUserJobOpening = async (req: Request, res: Response) => {
  try {
    const jobOpenings = await prisma.jobPosting.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(201).json({ jobOpenings });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
      details: error,
    });
  }
};

const getJobOpening = async (req: Request, res: Response) => {
  try {
    const jobOpeningId = req.params.id;

    const jobOpening = await prisma.jobPosting.findFirst({
      where: {
        id: jobOpeningId,
      },
    });

    res.status(201).json({ jobOpening });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const updateJobOpening = async (req: Request, res: Response) => {
  try {
    const jobOpeningId = req.params.id;

    const updates = req.body;

    const updatedJobOpening = await prisma.jobPosting.update({
      where: {
        id: jobOpeningId,
      },
      data: updates,
    });

    res.status(201).json({ updatedJobOpening });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const deleteJobOpening = async (req: Request, res: Response) => {
  try {
    const jobOpeningId = req.params.id;

    await prisma.jobPosting.findFirst({
      where: {
        id: jobOpeningId,
      },
    });

    res.status(201).json({ message: "job opening deleted successfully!!" });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const createApplication = async (req: Request, res: Response) => {
  try {
    const decoded = await applicationSchema.safeParse(req.body);

    if (!decoded.success) {
      res.status(400).json({
        error: "Invalid job opening data",
        details: decoded.error,
      });
      return;
    }

    console.log("decoded", decoded.data);

    const { recruterId, resume, jobId, role, company } = decoded.data;

    const createApplication = await prisma.applications.create({
      data: {
        userId: req.user.id!,
        status: "Pending",
        jobId,
        role,
        company,
        recruterId,
        resume,
      },
    });

    res.status(200).json({ application: createApplication });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getApplication = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.id;

    const applications = await prisma.applications.findMany({
      where: {
        jobId,
      },
    });

    res.status(200).json({ applications });
  } catch (error) {
    console.log("erroro", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getUserApplications = async (req: Request, res: Response) => {
  try {
    const applications = await prisma.applications.findMany({
      where: {
        userId: req.user.id,
      },
    });

    console.log("applictaions", applications);

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    console.log(
      "updateApplicationStatus called ..............................................."
    );
    const { status } = req.body;
    console.log("body", req.body);
    const applicationId = req.params.id;
    console.log("applicationId", applicationId);

    const updated = await prisma.applications.update({
      where: {
        id: applicationId,
      },
      data: {
        status,
      },
    });

    console.log("updtaed application", updated);

    res.status(200).json({ message: "status updated successfully!!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

export {
  createJobOpening,
  getAllJobOpenings,
  getJobOpening,
  updateApplicationStatus,
  getApplication,
  getUserApplications,
  createApplication,
  updateJobOpening,
  deleteJobOpening,
  getUserJobOpening,
};

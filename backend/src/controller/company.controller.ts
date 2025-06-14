import { Request, Response } from "express";
import { addCompanySchema } from "../types";
import { prisma } from "../db/config";
import { uploadImageToCloudinary } from "../utils/imageUpload";

const registerCompany = async (req: Request, res: Response) => {
  try {
    const decoded = await addCompanySchema.safeParse(req.body);

    if (!decoded.success) {
      console.log("erorr", decoded.error);
      res.status(400).json({
        error: "Invalid login data",
        details: decoded.error,
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        error: "Avatar is required",
        details: decoded.error,
      });
      return;
    }

    console.log("decode", decoded.data);

    const result = await uploadImageToCloudinary(req.file.buffer);
    const { url, id } = await JSON.parse(result);

    const company = await prisma.company.create({
      data: {
        name: decoded.data.name,
        description: decoded.data.description,
        location: decoded.data.location,
        userId: req.user.id!,
        logo_url: url,
        logo_public_id: id,
      },
    });

    console.log("company", company);

    res.status(200).json({
      message: "comapany registered successfully!!",
      company,
    });
  } catch (error) {
    console.error("Error during company registration ", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({});

    res.status(200).json({
      companies,
    });
  } catch (error) {
    console.error("Error during company registration ", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

const getUserCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json({
      companies,
    });
  } catch (error) {
    console.error("Error during company registration ", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

const updateCompanyDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("req.body", req.body);
    const updateData = { ...req.body }; // Make a shallow copy of req.body
    console.log("updateData", updateData);
    
    if (!id) {
      res.status(400).json({
        error: "Company ID is required for update.",
      });
      return;
    }

    const existingCompany = await prisma.company.findUnique({
      where: { id },
    });

    console.log("existingCompany", existingCompany);

    if (!existingCompany) {
      res.status(404).json({
        error: "Company not found.",
      });
      return;
    }

    // Handle logo upload if file exists
    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.buffer);
      const { url, id: publicId } = JSON.parse(result);

      updateData.logo_url = url; // Match the exact column name in your database
      updateData.logo_public_id = publicId;
    }

    // Remove non-updateable fields
    delete updateData.id;
    delete updateData.userId;

    // Perform the update
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: updateData, // Only pass fields meant for update
    });

    res.status(200).json({
      message: "Company details updated successfully.",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error during company update: ", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: "Company ID is required for update.",
      });
      return;
    }

    await prisma.company.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Error during company update: ", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

const getCompanyDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: "Company ID is required for update.",
      });
      return;
    }

    const company = await prisma.company.findFirst({
      where: {
        id,
      },
    });

    res.status(200).json({
      company,
    });
  } catch (error) {
    console.error("Error during company fetcching details: ", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

export {
  registerCompany,
  getAllCompanies,
  updateCompanyDetails,
  getUserCompanies,
  deleteCompany,
  getCompanyDetails,
};

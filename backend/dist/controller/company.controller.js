"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyDetails = exports.deleteCompany = exports.getUserCompanies = exports.updateCompanyDetails = exports.getAllCompanies = exports.registerCompany = void 0;
const types_1 = require("../types");
const config_1 = require("../db/config");
const imageUpload_1 = require("../utils/imageUpload");
const registerCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield types_1.addCompanySchema.safeParse(req.body);
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
        const result = yield (0, imageUpload_1.uploadImageToCloudinary)(req.file.buffer);
        const { url, id } = yield JSON.parse(result);
        const company = yield config_1.prisma.company.create({
            data: {
                name: decoded.data.name,
                description: decoded.data.description,
                location: decoded.data.location,
                userId: req.user.id,
                logo_url: url,
                logo_public_id: id,
            },
        });
        console.log("company", company);
        res.status(200).json({
            message: "comapany registered successfully!!",
            company,
        });
    }
    catch (error) {
        console.error("Error during company registration ", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.registerCompany = registerCompany;
const getAllCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield config_1.prisma.company.findMany({});
        res.status(200).json({
            companies,
        });
    }
    catch (error) {
        console.error("Error during company registration ", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.getAllCompanies = getAllCompanies;
const getUserCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield config_1.prisma.company.findMany({
            where: {
                userId: req.user.id,
            },
        });
        res.status(200).json({
            companies,
        });
    }
    catch (error) {
        console.error("Error during company registration ", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.getUserCompanies = getUserCompanies;
const updateCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("req.body", req.body);
        const updateData = Object.assign({}, req.body); // Make a shallow copy of req.body
        console.log("updateData", updateData);
        if (!id) {
            res.status(400).json({
                error: "Company ID is required for update.",
            });
            return;
        }
        const existingCompany = yield config_1.prisma.company.findUnique({
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
            const result = yield (0, imageUpload_1.uploadImageToCloudinary)(req.file.buffer);
            const { url, id: publicId } = JSON.parse(result);
            updateData.logo_url = url; // Match the exact column name in your database
            updateData.logo_public_id = publicId;
        }
        // Remove non-updateable fields
        delete updateData.id;
        delete updateData.userId;
        // Perform the update
        const updatedCompany = yield config_1.prisma.company.update({
            where: { id },
            data: updateData, // Only pass fields meant for update
        });
        res.status(200).json({
            message: "Company details updated successfully.",
            company: updatedCompany,
        });
    }
    catch (error) {
        console.error("Error during company update: ", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.updateCompanyDetails = updateCompanyDetails;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                error: "Company ID is required for update.",
            });
            return;
        }
        yield config_1.prisma.company.delete({
            where: {
                id,
            },
        });
        res.status(200).json({
            message: "Company deleted successfully.",
        });
    }
    catch (error) {
        console.error("Error during company update: ", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.deleteCompany = deleteCompany;
const getCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                error: "Company ID is required for update.",
            });
            return;
        }
        const company = yield config_1.prisma.company.findFirst({
            where: {
                id,
            },
        });
        res.status(200).json({
            company,
        });
    }
    catch (error) {
        console.error("Error during company fetcching details: ", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.getCompanyDetails = getCompanyDetails;

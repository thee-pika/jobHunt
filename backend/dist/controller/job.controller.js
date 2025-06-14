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
exports.getUserJobOpening = exports.deleteJobOpening = exports.updateJobOpening = exports.createApplication = exports.getUserApplications = exports.getApplication = exports.updateApplicationStatus = exports.getJobOpening = exports.getAllJobOpenings = exports.createJobOpening = void 0;
const types_1 = require("../types");
const config_1 = require("../db/config");
const createJobOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield types_1.jobOpeningSchema.safeParse(req.body);
        if (!decoded.success) {
            console.log("error", decoded.error);
            res.status(400).json({
                error: "Invalid job opening data",
                details: decoded.error,
            });
            return;
        }
        const { title, salary, location, skills, deadline, logo_url, company, type, } = decoded.data;
        const jobOpening = yield config_1.prisma.jobPosting.create({
            data: {
                title,
                location,
                userId: req.user.id,
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
    }
    catch (error) {
        console.log("errror", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.createJobOpening = createJobOpening;
const getAllJobOpenings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobOpenings = yield config_1.prisma.jobPosting.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.status(201).json({ jobOpenings });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
            details: error,
        });
    }
});
exports.getAllJobOpenings = getAllJobOpenings;
const getUserJobOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobOpenings = yield config_1.prisma.jobPosting.findMany({
            where: {
                userId: req.user.id,
            },
        });
        res.status(201).json({ jobOpenings });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
            details: error,
        });
    }
});
exports.getUserJobOpening = getUserJobOpening;
const getJobOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobOpeningId = req.params.id;
        const jobOpening = yield config_1.prisma.jobPosting.findFirst({
            where: {
                id: jobOpeningId,
            },
        });
        res.status(201).json({ jobOpening });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.getJobOpening = getJobOpening;
const updateJobOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobOpeningId = req.params.id;
        const updates = req.body;
        const updatedJobOpening = yield config_1.prisma.jobPosting.update({
            where: {
                id: jobOpeningId,
            },
            data: updates,
        });
        res.status(201).json({ updatedJobOpening });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.updateJobOpening = updateJobOpening;
const deleteJobOpening = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobOpeningId = req.params.id;
        yield config_1.prisma.jobPosting.findFirst({
            where: {
                id: jobOpeningId,
            },
        });
        res.status(201).json({ message: "job opening deleted successfully!!" });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.deleteJobOpening = deleteJobOpening;
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield types_1.applicationSchema.safeParse(req.body);
        if (!decoded.success) {
            res.status(400).json({
                error: "Invalid job opening data",
                details: decoded.error,
            });
            return;
        }
        console.log("decoded", decoded.data);
        const { recruterId, resume, jobId, role, company } = decoded.data;
        const createApplication = yield config_1.prisma.applications.create({
            data: {
                userId: req.user.id,
                status: "Pending",
                jobId,
                role,
                company,
                recruterId,
                resume,
            },
        });
        res.status(200).json({ application: createApplication });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.createApplication = createApplication;
const getApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const applications = yield config_1.prisma.applications.findMany({
            where: {
                jobId,
            },
        });
        res.status(200).json({ applications });
    }
    catch (error) {
        console.log("erroro", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.getApplication = getApplication;
const getUserApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield config_1.prisma.applications.findMany({
            where: {
                userId: req.user.id,
            },
        });
        console.log("applictaions", applications);
        res.status(200).json({ applications });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.getUserApplications = getUserApplications;
const updateApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("updateApplicationStatus called ...............................................");
        const { status } = req.body;
        console.log("body", req.body);
        const applicationId = req.params.id;
        console.log("applicationId", applicationId);
        const updated = yield config_1.prisma.applications.update({
            where: {
                id: applicationId,
            },
            data: {
                status,
            },
        });
        console.log("updtaed application", updated);
        res.status(200).json({ message: "status updated successfully!!" });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.updateApplicationStatus = updateApplicationStatus;

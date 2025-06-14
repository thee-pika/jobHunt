"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoute = void 0;
const express_1 = __importDefault(require("express"));
const company_controller_1 = require("../controller/company.controller");
const uploadSingle_1 = require("../middleware/multer/uploadSingle");
const AuthMiddleware_1 = require("../middleware/auth/AuthMiddleware");
exports.companyRoute = (0, express_1.default)();
exports.companyRoute.post("/register", AuthMiddleware_1.AuthMiddleware, uploadSingle_1.uploadSingle, company_controller_1.registerCompany);
exports.companyRoute.get("/", AuthMiddleware_1.AuthMiddleware, company_controller_1.getUserCompanies);
exports.companyRoute.put("/:id", AuthMiddleware_1.AuthMiddleware, uploadSingle_1.uploadSingle, company_controller_1.updateCompanyDetails);
exports.companyRoute.delete("/:id", AuthMiddleware_1.AuthMiddleware, company_controller_1.deleteCompany);
exports.companyRoute.get("/:id", AuthMiddleware_1.AuthMiddleware, company_controller_1.getCompanyDetails);

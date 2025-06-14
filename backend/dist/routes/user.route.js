"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const uploadSingle_1 = require("../middleware/multer/uploadSingle");
const AuthMiddleware_1 = require("../middleware/auth/AuthMiddleware");
exports.userRoute = (0, express_1.default)();
exports.userRoute.get("/", AuthMiddleware_1.AuthMiddleware, user_controller_1.getUserDetails);
exports.userRoute.put("/avatar", AuthMiddleware_1.AuthMiddleware, uploadSingle_1.uploadSingle, user_controller_1.updateAvatar);
exports.userRoute.put("/resume", AuthMiddleware_1.AuthMiddleware, uploadSingle_1.uploadSingle, user_controller_1.uploadResume);
exports.userRoute.put("/update", AuthMiddleware_1.AuthMiddleware, user_controller_1.updateUser);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.multerUpload = (0, multer_1.default)({
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
const uploadSingle = exports.multerUpload.single("image");
exports.uploadSingle = uploadSingle;

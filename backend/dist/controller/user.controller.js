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
exports.updateUser = exports.updateAvatar = exports.uploadResume = exports.getUserDetails = void 0;
const config_1 = require("../db/config");
const imageUpload_1 = require("../utils/imageUpload");
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("req.user", req.user);
        const user = yield config_1.prisma.user.findFirst({
            where: {
                id: req.user.id,
            },
        });
        res.json({ user });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.getUserDetails = getUserDetails;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield config_1.prisma.user.findFirst({
            where: {
                id: req.user.id,
            },
        });
        if (!user) {
            res.status(400).json({
                error: "User not found!!",
            });
            return;
        }
        if (!req.file) {
            res.status(400).json({
                error: "Avatar is required",
            });
            return;
        }
        const result = yield (0, imageUpload_1.uploadImageToCloudinary)(req.file.buffer);
        const { url, id } = yield JSON.parse(result);
        yield (0, imageUpload_1.uploadImageToCloudinary)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
        const updated = yield config_1.prisma.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            data: {
                avatar: url,
                avatar_public_id: id,
            },
        });
        console.log("updated", updated);
        res.json({ user: updated, message: "avatar updated Successfully!!" });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.updateAvatar = updateAvatar;
const uploadResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield config_1.prisma.user.findFirst({
            where: {
                id: req.user.id,
            },
        });
        if (!user) {
            res.status(400).json({
                error: "User not found!!",
            });
            return;
        }
        if (!req.file) {
            res.status(400).json({
                error: "Avatar is required",
            });
            return;
        }
        const result = yield (0, imageUpload_1.uploadImageToCloudinary)(req.file.buffer);
        const { url, id } = yield JSON.parse(result);
        yield (0, imageUpload_1.uploadImageToCloudinary)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
        const updated = yield config_1.prisma.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            data: {
                publicId: id,
                resume: url,
            },
        });
        res.json({ user: updated, message: "resume uploaded successfully!!" });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.uploadResume = uploadResume;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        console.log("updates", updates);
        const user = yield config_1.prisma.user.findFirst({
            where: {
                id: req.user.id,
            },
        });
        if (!user) {
            res.status(400).json({
                error: "User not found!!",
            });
            return;
        }
        const updated = yield config_1.prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: updates,
        });
        console.log("updated  ", updated);
        res.json({ user: updated });
    }
    catch (error) {
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.updateUser = updateUser;

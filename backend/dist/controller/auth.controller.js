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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = void 0;
const types_1 = require("../types");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../db/config");
const token_1 = __importDefault(require("../services/token"));
const hashPassword_1 = require("../services/hashPassword");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield types_1.loginSchema.safeParse(req.body);
        if (!decoded.success) {
            console.log("req", req.body);
            console.log("erorr", decoded.error);
            res.status(400).json({
                error: "Invalid login data",
                details: decoded.error,
            });
            return;
        }
        const user = yield config_1.prisma.user.findFirst({
            where: {
                email: decoded.data.email,
            },
        });
        if (!user) {
            res.status(404).json({
                error: "User not found",
            });
            return;
        }
        if (!user.password) {
            res.status(401).json({
                error: "Invalid password",
            });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(decoded.data.password, user.password);
        if (!isValid) {
            res.status(401).json({
                error: "Invalid password",
            });
            return;
        }
        const { access_Token, refresh_Token } = yield (0, token_1.default)(user);
        console.log("access_Token", access_Token);
        res.status(200).json({
            message: "Login successful",
            tokens: {
                access_Token,
                refresh_Token,
                user,
            },
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = yield types_1.signUpSchema.safeParse(req.body);
        if (!decoded.success) {
            console.log("rreq", req.body);
            console.log("err", decoded.error);
            res.status(400).json({
                error: "Invalid signUp data",
                details: decoded.error,
            });
            return;
        }
        // if (!req.file) {
        //   res.status(400).json({
        //     error: "Avatar is required",
        //     details: decoded.error,
        //   });
        //   return;
        // }
        const user = yield config_1.prisma.user.findFirst({
            where: {
                email: decoded.data.email,
            },
        });
        console.log("user", user);
        if (user) {
            res.status(404).json({
                error: "User already exists with this email",
            });
            return;
        }
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(decoded.data.password);
        // const result = await uploadImageToCloudinary(req.file.buffer);
        // console.log("erssssssssssss", result);
        // const { url, id } = await JSON.parse(result);
        const newUser = yield config_1.prisma.user.create({
            data: {
                email: decoded.data.email,
                password: hashedPassword,
                fullName: decoded.data.fullName,
                role: decoded.data.role,
            },
        });
        res.status(200).json({
            message: "signup successful",
            user: newUser,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error,
        });
    }
});
exports.signUp = signUp;

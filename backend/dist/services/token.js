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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generateTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
    const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
    if (!JWT_ACCESS_TOKEN || !JWT_REFRESH_TOKEN) {
        console.log("secrets not found!!!");
        return { access_Token: "", refresh_Token: "" };
    }
    console.log("user", user);
    const access_Token = yield jsonwebtoken_1.default.sign({ user }, JWT_ACCESS_TOKEN, {
        expiresIn: "24h",
    });
    const refresh_Token = yield jsonwebtoken_1.default.sign({ user }, JWT_REFRESH_TOKEN, {
        expiresIn: "7d",
    });
    return { access_Token, refresh_Token };
});
exports.default = generateTokens;

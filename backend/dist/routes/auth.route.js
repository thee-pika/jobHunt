"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
exports.authRoute = (0, express_1.default)();
exports.authRoute.post("/login", auth_controller_1.login);
exports.authRoute.post("/signup", auth_controller_1.signUp);

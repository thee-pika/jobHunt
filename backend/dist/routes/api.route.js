"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoute = void 0;
const express_1 = __importDefault(require("express"));
const clerkWebhook_1 = require("../controller/clerkWebhook");
exports.apiRoute = (0, express_1.default)();
exports.apiRoute.post("/webhooks", express_1.default.raw({ type: 'application/json' }), clerkWebhook_1.clerkWebHook);
exports.apiRoute.get("/", clerkWebhook_1.getRequest);

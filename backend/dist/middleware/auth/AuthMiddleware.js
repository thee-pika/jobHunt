"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Role;
(function (Role) {
    Role[Role["Accepted"] = 0] = "Accepted";
    Role[Role["Rejected"] = 1] = "Rejected";
    Role[Role["Pending"] = 2] = "Pending";
})(Role || (Role = {}));
const AuthMiddleware = (req, res, next) => {
    console.log("insode authmideelware ...");
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401).json({ error: "No authorization header provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Token missing" });
        return;
    }
    try {
        const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN;
        if (!ACCESS_TOKEN_SECRET) {
            res.status(403).json({ message: "ACCESS_TOKEN_SECRET not found !!" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        const { user } = decoded;
        req.user = user;
        console.log("authenticated ....");
        next();
    }
    catch (error) {
        console.log("error", error);
        res.sendStatus(403);
        return;
    }
};
exports.AuthMiddleware = AuthMiddleware;

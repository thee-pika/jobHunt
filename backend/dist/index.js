"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("./routes/auth.route");
const comapny_route_1 = require("./routes/comapny.route");
const job_route_1 = require("./routes/job.route");
const user_route_1 = require("./routes/user.route");
(0, dotenv_1.config)();
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT;
// app.post(
//   "/api/webhooks",
//   express.raw({ type: "application/json" }),
//   clerkWebHook
// );
app.use("/api/v1/auth", auth_route_1.authRoute);
app.use("/api/v1/company", comapny_route_1.companyRoute);
app.use("/api/v1/job", job_route_1.jobRoute);
app.use("/api/v1/user", user_route_1.userRoute);
app.get("/", (req, res) => {
    res.send({ message: "App is saying hiii" });
});
app.listen(PORT, () => {
    console.log("App is running on", PORT);
});

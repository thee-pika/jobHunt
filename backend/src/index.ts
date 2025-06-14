import express from "express";
import { config } from "dotenv";
import { verifyWebhook } from "@clerk/express/webhooks";
import { apiRoute } from "./routes/api.route";
import multer from "multer";
import { clerkWebHook } from "./controller/clerkWebhook";
import cors from "cors";
import { authRoute } from "./routes/auth.route";
import { companyRoute } from "./routes/comapny.route";
import { jobRoute } from "./routes/job.route";
import { userRoute } from "./routes/user.route";
config();

const storage = multer.diskStorage({});

const upload = multer({ storage });
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// app.post(
//   "/api/webhooks",
//   express.raw({ type: "application/json" }),
//   clerkWebHook
// );

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send({ message: "App is saying hiii" });
});

app.listen(PORT, () => {
  console.log("App is running on", PORT);
});

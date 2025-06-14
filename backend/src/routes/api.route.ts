import express from "express";
import { clerkWebHook, getRequest } from "../controller/clerkWebhook";
export const apiRoute = express();

apiRoute.post("/webhooks", express.raw({ type: 'application/json' }) , clerkWebHook);

apiRoute.get("/", getRequest);

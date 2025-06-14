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
exports.getRequest = exports.clerkWebHook = void 0;
const svix_1 = require("svix");
const config_1 = require("../db/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const clerkWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SIGNING_SECRET = "whsec_/VDRu3rE0w9PtztG8TUL3s5SGEaqGjbW";
        if (!SIGNING_SECRET) {
            console.log("SIGNING_SECRET not found", SIGNING_SECRET);
            throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local juib");
        }
        const whook = new svix_1.Webhook(SIGNING_SECRET);
        const payloadString = req.body.toString();
        const evt = yield whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });
        const { data, type } = evt;
        const email = data.email_addresses[0].email_address;
        console.log("email", email);
        console.log("data", data);
        switch (type) {
            case "user.created": {
                const userData = {
                    id: data.id,
                    email,
                    fullName: data.first_name,
                    avatar: data.image_url,
                };
                console.log("userData", userData);
                const user = yield config_1.prisma.user.create({
                    data: {
                        id: data.id,
                        email,
                        fullName: data.first_name,
                        avatar: data.image_url,
                        publicId: ""
                    },
                });
                console.log("user", user);
                res.json({ message: "user created successfulluy!!", user });
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email,
                    username: data.first_name,
                    avatar: data.image_url,
                };
                const updatdeUser = yield config_1.prisma.user.update({
                    where: {
                        id: data.id,
                    },
                    data: userData,
                });
                console.log("user updatdeUser", updatdeUser);
                res.json({ message: "user created successfulluy!!", updatdeUser });
                break;
            }
            case "user.deleted": {
                yield config_1.prisma.user.delete({
                    where: {
                        id: data.id,
                    },
                });
                res.json({ message: "user deleted successfulluy!!" });
                console.log("user deleted successfull1!");
                break;
            }
            default:
                break;
        }
    }
    catch (error) {
        res.json({ success: false, message: "an error occured!!" });
    }
});
exports.clerkWebHook = clerkWebHook;
// ngrok http 5000 --url https://a12f-60-243-190-212.ngrok-free.app
const getRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "getRequest  test endpoint callled ..." });
});
exports.getRequest = getRequest;

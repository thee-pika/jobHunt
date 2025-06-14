import { Response, Request } from "express";
import { Webhook } from "svix";
import { prisma } from "../db/config";
import { config } from "dotenv";

config();

export const clerkWebHook = async (req: Request, res: Response) => {
  try {
    const SIGNING_SECRET = "whsec_/VDRu3rE0w9PtztG8TUL3s5SGEaqGjbW";

    if (!SIGNING_SECRET) {
      console.log("SIGNING_SECRET not found", SIGNING_SECRET);
      throw new Error(
        "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local juib"
      );
    }

    const whook = new Webhook(SIGNING_SECRET);

    const payloadString = req.body.toString();

    const evt = await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"] as string,
      "svix-timestamp": req.headers["svix-timestamp"] as string,
      "svix-signature": req.headers["svix-signature"] as string,
    });

    const { data, type } = evt as {
      data: {
        id: string;
        email: string;
        first_name: string;
        image_url: string;
        email_addresses: [{ email_address: string }];
      };
      type: string;
    };
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

        const user = await prisma.user.create({
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

        const updatdeUser = await prisma.user.update({
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
        await prisma.user.delete({
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
  } catch (error) {
    res.json({ success: false, message: "an error occured!!" });
  }
};

// ngrok http 5000 --url https://a12f-60-243-190-212.ngrok-free.app

export const getRequest = async (req: Request, res: Response) => {
  res.send({ message: "getRequest  test endpoint callled ..." });
};

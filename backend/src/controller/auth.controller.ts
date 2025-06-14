import { Request, Response } from "express";
import { loginSchema, signUpSchema } from "../types";
import bcrypt from "bcrypt";
import { prisma } from "../db/config";
import generateTokens from "../services/token";
import { hashPassword } from "../services/hashPassword";
import { uploadImageToCloudinary } from "../utils/imageUpload";

const login = async (req: Request, res: Response) => {
  try {
    const decoded = await loginSchema.safeParse(req.body);

    if (!decoded.success) {
      console.log("req", req.body);
      console.log("erorr", decoded.error);
      res.status(400).json({
        error: "Invalid login data",
        details: decoded.error,
      });
      return;
    }

    const user = await prisma.user.findFirst({
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

    const isValid = await bcrypt.compare(decoded.data.password, user.password);

    if (!isValid) {
      res.status(401).json({
        error: "Invalid password",
      });
      return;
    }

    const { access_Token, refresh_Token } = await generateTokens(user);
    console.log("access_Token", access_Token);
    res.status(200).json({
      message: "Login successful",
      tokens: {
        access_Token,
        refresh_Token,
        user,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const decoded = await signUpSchema.safeParse(req.body);

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

    const user = await prisma.user.findFirst({
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

    const hashedPassword = await hashPassword(decoded.data.password);

    // const result = await uploadImageToCloudinary(req.file.buffer);
    // console.log("erssssssssssss", result);

    // const { url, id } = await JSON.parse(result);

    const newUser = await prisma.user.create({
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
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error,
    });
  }
};

export { login, signUp };

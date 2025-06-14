import { Request, Response } from "express";
import { prisma } from "../db/config";
import { uploadImageToCloudinary } from "../utils/imageUpload";

const getUserDetails = async (req: Request, res: Response) => {
  try {
    console.log("req.user", req.user);

    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    res.json({ user });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const updateAvatar = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      res.status(400).json({
        error: "User not found!!",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        error: "Avatar is required",
      });
      return;
    }

    const result = await uploadImageToCloudinary(req.file.buffer);
    const { url, id } = await JSON.parse(result);

    await uploadImageToCloudinary(req.file?.buffer);

    const updated = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        avatar: url,
        avatar_public_id: id,
      },
    });

    console.log("updated", updated);

    res.json({ user: updated, message: "avatar updated Successfully!!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const uploadResume = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      res.status(400).json({
        error: "User not found!!",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        error: "Avatar is required",
      });
      return;
    }

    const result = await uploadImageToCloudinary(req.file.buffer);
    const { url, id } = await JSON.parse(result);

    await uploadImageToCloudinary(req.file?.buffer);
    const updated = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        publicId: id,
        resume: url,
      },
    });

    res.json({ user: updated, message: "resume uploaded successfully!!" });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    console.log("updates", updates);

    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      res.status(400).json({
        error: "User not found!!",
      });
      return;
    }

    const updated = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: updates,
    });

    console.log("updated  ", updated);

    res.json({ user: updated });
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
};

export { getUserDetails, uploadResume, updateAvatar, updateUser };

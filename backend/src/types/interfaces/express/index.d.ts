import { Request } from "express";

interface UserT {
  resume: string | null;
  email: string;
  password: string | null;
  id: string;
  fullName: string;
  bio: string | null;
  jobRole: string | null;
  role: Role;
  createdAt: Date;
  avatar: string | null;
  publicId: string | null;
}


declare global {
    namespace Express {
        interface Request {
            user:UserT
        }
    }
}
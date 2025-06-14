import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
enum Role {
  Accepted,
  Rejected,
  Pending,
}
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

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const { user } = decoded as { user: UserT };

    req.user = user;
    console.log("authenticated ....");
    next();
  } catch (error) {
    console.log("error", error);
    res.sendStatus(403);
    return;
  }
};

export { AuthMiddleware };

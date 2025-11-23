import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.json({ message: "Token is missing" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.json({ message: "Invalid or expired token" });
  }
};

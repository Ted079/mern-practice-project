import UserModel from "../../modules/user/user.model";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.json({
        message: "An account with this email already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = new UserModel({
      username,
      email,
      password: passwordHash,
    });

    await user.save();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const { password: _, ...userData } = user.toObject();

    res.json({
      user: userData,
      token,
      message: "Registration was successful",
    });
  } catch (error) {
    res.json({ error: "Error during registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "There is no such user.",
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.json({ message: "password is not correct" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password: _, ...userData } = user.toObject();

    res.json({
      user: userData,
      token,
      message: "You successful loged in the acc",
    });
  } catch (error) {
    res.json({ error: "error to login" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.json({ message: "There is no such user" });
    }

    const {password: _, ...userData} = user.toObject();

    res.json({ user: userData });
  } catch (error) {
    res.json({ error: "authorization error" });
  }
};

import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginWithEmailAndPAssword = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginWithEmailAndPAssword(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const authController = { loginWithEmailAndPAssword };

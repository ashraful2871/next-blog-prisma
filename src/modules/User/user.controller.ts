import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllFromDb = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllFromDb();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserById(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userController = { createUser, getAllFromDb, getUserById };

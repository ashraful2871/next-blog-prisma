import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const search = (req.query.search as string) || "";
    const IsFeatured = req.query.IsFeatured
      ? req.query.IsFeatured === "true"
      : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const result = await postService.getAllPost({
      page,
      limit,
      search,
      IsFeatured,
      tags,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getPostById = async (req: Request, res: Response) => {
  try {
    const result = await postService.getPostById(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await postService.deletePost(Number(req.params.id));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updatePost = async (req: Request, res: Response) => {
  try {
    const result = await postService.updatePost(
      Number(req.params.id),
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  updatePost,
};

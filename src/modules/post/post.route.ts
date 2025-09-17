import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getAllPost);
router.get("/stat", postController.getBlogStat);
router.post("/", postController.createPost);
router.get("/:id", postController.getPostById);
router.delete("/:id", postController.deletePost);
router.patch("/:id", postController.updatePost);

export const postRoute = router;

import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

// router.get("/", userController.getAllFromDb);
router.post("/", postController.createPost);
// router.get("/:id", userController.getUserById);

export const postRoute = router;

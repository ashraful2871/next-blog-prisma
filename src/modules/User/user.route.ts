import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getAllFromDb);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);

export const userRoute = router;

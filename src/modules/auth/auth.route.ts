import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.loginWithEmailAndPAssword);
router.post("/google", authController.authWithGoogle);

export const authRoute = router;

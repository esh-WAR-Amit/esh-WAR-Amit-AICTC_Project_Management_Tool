import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await loginUser(req, res);
});

export default router;

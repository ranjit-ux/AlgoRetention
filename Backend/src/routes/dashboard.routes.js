import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/",getDashboardData);

export default router;
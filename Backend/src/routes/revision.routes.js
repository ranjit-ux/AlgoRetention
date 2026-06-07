import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { reviseProblem, getTodayRevisions } from "../controllers/revision.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/today", getTodayRevisions);

router.post("/:problemId/review",reviseProblem);

export default router;
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import {
    createProblem,
    getProblems,
    getProblemById,
    updateProblem,
    deleteProblem,
    getProblemFilters,
    getDueRevisions,
} from "../controllers/problem.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createProblem);

router.get("/", getProblems);

router.get("/filters",getProblemFilters);

router.get("/due",getDueRevisions);

router.get("/:id", getProblemById);

router.put("/:id", updateProblem);

router.delete("/:id", deleteProblem);



export default router;
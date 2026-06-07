import express from 'express';
import { googleLogin,getCurrentUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/google",googleLogin);

router.get("/me",authMiddleware,getCurrentUser);

router.get("/test",(req,res) => {
    res.json({
        success: true,
        message: "Auth routes working",
    });
});

export default router;
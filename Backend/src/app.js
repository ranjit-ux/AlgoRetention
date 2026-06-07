import "dotenv/config";
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import problemRoutes from "./routes/problem.routes.js";
import revisionRoutes from "./routes/revision.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

console.log("CLIENT_URL=",process.env.CLIENT_URL)


app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
        success:true,
        message: "AlgoRetention API Working"
    });
});

app.use("/api/auth",authRoutes);
app.use("/api/problems",problemRoutes);
app.use("/api/revisions",revisionRoutes);
app.use("/api/dashboard",dashboardRoutes);

export default app;
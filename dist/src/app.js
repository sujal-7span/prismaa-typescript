import express from "express";
import userRoutes from "./modules/auth/auth.route.js";
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
export default app;

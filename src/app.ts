import express from "express";
import userRoutes from "./modules/auth/auth.route";

const app = express();

app.use(express.json());

//routes 

app.use("/users", userRoutes);

export default app;
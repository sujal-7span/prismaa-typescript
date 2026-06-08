import express from "express";
import userRoutes from "./modules/auth/auth.route.js";
import brandRoutes from "./modules/brand/brand.route.js";
import categoryRoutes from "./modules/category/category.route.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);

export default app;

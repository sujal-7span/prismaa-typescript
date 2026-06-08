import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "./category.controller.js";
import { validate } from "../../middlewears/validate.middlewear.js";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";
import { authMiddlewear } from "../../middlewears/auth.middlewear.js";
import { authorize } from "../../middlewears/rbac.middlewear.js";

const router = Router();

router.use(authMiddlewear);

router.route("/")
    .post(
        authorize("ADMIN", "MODERATOR"),
        validate(createCategorySchema),
        createCategory
    )
    .get(
        getAllCategories
    );

router.route("/:id")
    .get(
        getCategoryById
    )
    .patch(
        authorize("ADMIN", "MODERATOR"),
        validate(updateCategorySchema),
        updateCategory
    )
    .delete(
        authorize("ADMIN", "MODERATOR"),
        deleteCategory
    );

export default router;

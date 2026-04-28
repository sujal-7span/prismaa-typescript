import { Router } from "express";
import {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
} from "./brand.controller.js";
import { validate } from "../../middlewears/validate.middlewear.js";
import { createBrandSchema, updateBrandSchema } from "./brand.validation.js";
import { authMiddlewear } from "../../middlewears/auth.middlewear.js";
import { authorize } from "../../middlewears/rbac.middlewear.js";

const router = Router();

router.route("/")
    .post(
        authMiddlewear,
        authorize("ADMIN", "MODERATOR"),
        validate(createBrandSchema),
        createBrand
    )
    .get(
        authMiddlewear,
        getAllBrands
    );

router.route("/:id")
    .get(
        authMiddlewear,
        getBrandById
    )
    .patch(
        authMiddlewear,
        authorize("ADMIN", "MODERATOR"),
        validate(updateBrandSchema),
        updateBrand
    )
    .delete(
        authMiddlewear,
        authorize("ADMIN", "MODERATOR"),
        deleteBrand
    );

export default router;
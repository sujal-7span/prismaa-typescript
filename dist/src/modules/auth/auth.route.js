import { Router } from "express";
import { validate } from "../../middlewears/validate.middlewear.js";
import { registerSchema, loginSchema, updateUserSchema } from "./auth.validation.js";
import { registerUser, loginUser, updateUser } from "./auth.controller.js";
import { authMiddlewear } from "../../middlewears/auth.middlewear.js";
import { authorize } from "../../middlewears/rbac.middlewear.js";
const router = Router();
router.route('/').post(validate(registerSchema), registerUser);
router.route('/login').post(validate(loginSchema), loginUser);
router.route('/:id')
    .patch(authMiddlewear, authorize("USER", "MODERATOR", "ADMIN"), validate(updateUserSchema), updateUser);
export default router;

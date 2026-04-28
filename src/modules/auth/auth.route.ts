import { Router } from "express";
import { validate } from "../../middlewears/validate.middlewear.js";
import { registerSchema, loginSchema, updateUserSchema, logoutSchema } from "./auth.validation.js";
import { registerUser, getAllUsers, loginUser, updateUser, logoutUser, deleteUser, getUserProfile } from "./auth.controller.js";
import { authMiddlewear } from "../../middlewears/auth.middlewear.js";

const router = Router();

router.route('/')
    .post(validate(registerSchema), registerUser)
    .get(authMiddlewear, getAllUsers);

router.route('/login').post(validate(loginSchema), loginUser);

router.route('/:id')
    .get(
        authMiddlewear,
        getUserProfile
    )
    .patch(
        authMiddlewear,
        validate(updateUserSchema),
        updateUser
    )
    .delete(
        authMiddlewear,
        deleteUser
    )

router.route('/logout')
    .post(
        authMiddlewear,
        validate(logoutSchema),
        logoutUser
    );


export default router;

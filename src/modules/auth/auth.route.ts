import { Router } from "express";
import { validate } from "../../middlewears/validate.middlewear.js";
import { registerSchema, loginSchema, updateUserSchema, logoutSchema } from "./auth.validation.js";
import { registerUser, getAllUsers, loginUser, updateUser, logoutUser, deleteUser, getUserProfile, myProfile } from "./auth.controller.js";
import { authMiddlewear } from "../../middlewears/auth.middlewear.js";

const router = Router();

router.route('/')
    .post(
        validate(registerSchema),
        registerUser
    )
    .get(
        authMiddlewear,
        getAllUsers
    );

router.route('/login')
    .post(
        validate(loginSchema),
        loginUser
    );

router.use(authMiddlewear)

router.route('/me')
    .get(
        myProfile
    )

router.route('/:id')
    .get(
        getUserProfile
    )
    .patch(
        validate(updateUserSchema),
        updateUser
    )
    .delete(
        deleteUser
    )

router.route('/logout')
    .post(
        validate(logoutSchema),
        logoutUser
    )



export default router;

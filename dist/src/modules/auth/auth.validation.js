import Joi from "joi";
export const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    role: Joi.string().valid("USER", "MODERATOR", "ADMIN").optional(),
});
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
});
export const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(2).optional(),
});

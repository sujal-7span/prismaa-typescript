import Joi from "joi";

export const createBrandSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
});

export const updateBrandSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
});
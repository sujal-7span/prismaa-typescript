import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({ message: error.details[0].message });
        }

        req.body = value

        next()
    };
};
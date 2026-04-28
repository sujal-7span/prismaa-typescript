import { Request, Response, NextFunction } from "express";
import type { Role } from "../utils/authuser.js";

export const authorize = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: `Route is not allowed for ${user.role}` })
        }
        next();
    }
}

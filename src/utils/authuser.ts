export type Role = "USER" | "MODERATOR" | "ADMIN";

export interface AuthUser {
    id: string;
    role: Role;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export {};

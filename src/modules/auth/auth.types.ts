import { Role } from "../../utils/authuser.js"

export interface registerUserType {
    username: string
    email: string
    password: string
    role?: Role
}

export interface findUserByEmailOrUsernameType {
    email: string,
    username: string
}

export interface loginUserType {
    email: string
    password: string
}

export interface updateRefreshTokenType {
    userId: string,
    refreshToken: string
}

export interface updateUserType {
    userId: string,
    email?: string,
    username?: string,
    password?: string
}

export interface logoutUserType {
    userId: string,
    refreshToken: string
}
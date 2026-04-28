import bcrypt from 'bcrypt';
import { generateTokens } from "../../utils/tokens.js";
import type { AuthUser } from "../../utils/authuser.js";
import {
    createUserDao,
    findUserByEmail,
    findUserByEmailOrUsername,
    findUserById,
    updateRefreshToken,
    removeRefreshTokenDao,
    updateUserDao,
    deleteUserDao,
    findAllUsersDao

} from './auth.dao.js';

const registerUser = async (data: {
    username: string
    email: string
    password: string
    role?: "USER" | "MODERATOR" | "ADMIN"
}) => {
    ``
    const { username, email, password, role = "USER" } = data;

    const existingUser = await findUserByEmailOrUsername(email, username);

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let assignedRole: "USER" | "MODERATOR" | "ADMIN" = "USER";

    if (role === "MODERATOR") {
        assignedRole = "MODERATOR";
    }

    const newUser = await createUserDao({
        username,
        email,
        password: hashedPassword,
        role: assignedRole
    });

    const { password: _, ...safeUser } = newUser

    return safeUser;

};

const getAllUsers = async () => {

    const users = await findAllUsersDao();

    return users.map(user => {
        const { password, refreshToken, ...safeUser } = user;
        return safeUser;
    });
};

const getUserProfile = async (userId: string) => {
    const user = await findUserById(userId);

    const { password, refreshToken, ...safeUser } = user!;

    return safeUser;
}

const loginUser = async (data: {
    email: string,
    password: string

}) => {
    const { email, password } = data;

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
        throw new Error('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, existingUser.password)

    if (!isMatch) {
        throw new Error('Invalid email or password')
    }

    const { accessToken, refreshToken } = await generateTokens(existingUser.id, existingUser.role)

    await updateRefreshToken(existingUser.id, refreshToken);

    const { password: _, refreshToken: __, ...safeUser } = existingUser

    return {
        user: safeUser,
        accessToken,
    };

}

const updateUser = async (
    currentUser: AuthUser,
    userId: string,
    data: {
        email?: string,
        username?: string,
        password?: string
    }) => {

    if (currentUser.id !== userId && currentUser.role !== "ADMIN") {
        throw new Error('Unauthorized');
    }

    const { password } = data;

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;
    }

    const updatedUser = await updateUserDao(userId, data);

    const { password: _, ...safeUser } = updatedUser

    return safeUser;
}

const logoutUser = async (
    userId: string,
    data: {
        refreshToken: string
    }
) => {
    const user = await findUserById(userId);
    if (!user || !user.refreshToken) {
        throw new Error('User not logged in');
    }
    if (user.refreshToken !== data.refreshToken) {
        throw new Error('Invalid refresh token');
    }

    await removeRefreshTokenDao(userId);
}

const deleteUser = async (
    currentUser: AuthUser,
    userId: string
) => {
    if (currentUser.id !== userId && currentUser.role !== "ADMIN") {
        throw new Error('Unauthorized');
    }

    await deleteUserDao(userId);
}

export const userService = { registerUser, getAllUsers, getUserProfile, loginUser, updateUser, logoutUser, deleteUser }

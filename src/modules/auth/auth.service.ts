import bcrypt from 'bcrypt';
import { generateTokens } from "../../utils/tokens.js";
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
import { loginUserType, logoutUserType, registerUserType, updateUserType } from './auth.types.js';

export const registerUserService = async ({
    username,
    email,
    password,
    role
}: registerUserType
) => {
    const existingUser = await findUserByEmailOrUsername({ email, username });

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

export const getAllUsersService = async () => {

    const users = await findAllUsersDao();

    return users.map(user => {
        const { password, refreshToken, ...safeUser } = user;
        return safeUser;
    });
};

export const getUserProfileService = async (userId: string) => {

    const user = await findUserById(userId);
    const { password, refreshToken, ...safeUser } = user!;
    return safeUser;
}

export const loginUserService = async ({
    email,
    password
}: loginUserType
) => {
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

    const { password: _ } = existingUser

    return {
        accessToken,
        refreshToken
    };

}

export const updateUserService = async ({
    userId,
    email,
    username,
    password
}: updateUserType
) => {
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
    }

    const updatedUser = await updateUserDao({ userId, email, username, password });

    const { password: _, ...safeUser } = updatedUser

    return safeUser;
}

export const logoutUserService = async ({
    userId,
    refreshToken
}: logoutUserType
) => {

    const user = await findUserById(userId);
    if (!user || !user.refreshToken) {
        throw new Error('User not logged in');
    }
    if (user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
    }

    await removeRefreshTokenDao(userId);
}

export const deleteUserService = async (userId: string) => {
    await deleteUserDao(userId);
}
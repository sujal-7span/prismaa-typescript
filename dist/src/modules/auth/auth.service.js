import bcrypt from 'bcrypt';
import { generateTokens } from "../../utils/tokens.js";
import { createUserDao, findUserByEmail, findUserByEmailOrUsername, findUserById, updateRefreshToken, updateUserDao } from './auth.dao.js';
const registerUser = async (data) => {
    ``;
    const { username, email, password, role = "USER" } = data;
    const existingUser = await findUserByEmailOrUsername(email, username);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let assignedRole = "USER";
    if (role === "MODERATOR") {
        assignedRole = "MODERATOR";
    }
    const newUser = await createUserDao({
        username,
        email,
        password: hashedPassword,
        role: assignedRole
    });
    const { password: _, ...safeUser } = newUser;
    return safeUser;
};
const loginUser = async (data) => {
    const { email, password } = data;
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    const { accessToken, refreshToken } = await generateTokens(existingUser.id, existingUser.role);
    await updateRefreshToken(existingUser.id, refreshToken);
    const { password: _, refreshToken: __, ...safeUser } = existingUser;
    return {
        user: safeUser,
        accessToken,
    };
};
const updateUser = async (currentUser, userId, data) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (currentUser.id !== userId && currentUser.role !== "ADMIN") {
        throw new Error('Unauthorized');
    }
    const { password } = data;
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        data.password = hashedPassword;
    }
    const updatedUser = await updateUserDao(userId, data);
    const { password: _, ...safeUser } = updatedUser;
    return safeUser;
};
export const userService = { registerUser, loginUser, updateUser };

import { prisma } from '../../lib/prisma.js';
export const findUserByEmailOrUsername = (email, username) => {
    return prisma.user.findFirst({
        where: {
            OR: [{ email }, { username }]
        }
    });
};
export const findUserById = (id) => {
    return prisma.user.findUnique({
        where: { id }
    });
};
export const createUserDao = (data) => {
    return prisma.user.create({
        data
    });
};
export const findUserByEmail = (email) => {
    return prisma.user.findUnique({
        where: { email }
    });
};
export const updateRefreshToken = (userId, refreshToken) => {
    return prisma.user.update({
        where: { id: userId },
        data: { refreshToken }
    });
};
export const updateUserDao = async (userId, data) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            ...data
        }
    });
};

import { prisma } from '../../lib/prisma.js';

export const findAllUsersDao = () => {
    return prisma.user.findMany();
};

export const findUserByEmailOrUsername = (email: string, username: string) => {
    return prisma.user.findFirst({
        where: {
            OR: [{ email }, { username }]
        }
    })
}

export const findUserById = (id: string) => {
    return prisma.user.findUnique({
        where: { id }
    })
}

export const createUserDao = (data: { username: string; email: string; password: string, role: "USER" | "MODERATOR" | "ADMIN" }) => {
    return prisma.user.create({
        data
    })
}

export const findUserByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    })
};

export const updateRefreshToken = (userId: string, refreshToken: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { refreshToken: refreshToken }
    })
};

export const updateUserDao = (userId: string, data: {
    email?: string,
    username?: string,
    password?: string
}) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            ...data
        }
    });
};

export const removeRefreshTokenDao = (userId: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
    })
}

export const deleteUserDao = async (userId: string) => {
    await prisma.user.delete({
        where: { id: userId }
    })
}
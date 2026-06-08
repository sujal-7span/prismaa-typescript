import { prisma } from '../../lib/prisma.js';
import { findUserByEmailOrUsernameType, registerUserType, updateUserType } from './auth.types.js';

export const findAllUsersDao = () => {
    return prisma.user.findMany();
};

export const findUserByEmailOrUsername = ({
    email,
    username
}: findUserByEmailOrUsernameType
) => {
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

export const createUserDao = ({
    username,
    email,
    password,
    role
}: registerUserType
) => {
    return prisma.user.create({
        data: {
            username,
            email,
            password,
            role
        }
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

export const updateUserDao = ({
    userId,
    email,
    username,
    password
}: updateUserType
) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            email,
            username,
            password
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
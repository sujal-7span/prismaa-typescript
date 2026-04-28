import { prisma } from "../../lib/prisma.js"

export const createBrandDao = (userId: string, name: string, description?: string) => {
    return prisma.brand.create({
        data: {
            userId,
            name,
            description
        }
    })
}

export const getAllBrandsDao = () => {
    return prisma.brand.findMany();
}

export const getBrandByIdDao = (id: string) => {
    return prisma.brand.findUnique({
        where: {
            id
        }
    });
}

export const updateBrandDao = (
    id: string,
    data: {
        name?: string;
        description?: string
    }
) => {
    return prisma.brand.update({
        where: { id },
        data
    })
}

export const deleteBrandDao = async (id: string) => {
    await prisma.brand.delete({
        where: {
            id
        }
    })
}
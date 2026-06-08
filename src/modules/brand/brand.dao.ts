import { prisma } from "../../lib/prisma.js"
import { createBrandType, updateBrandType } from "./brand.types.js";

export const createBrandDao = (
    userId: string, {
        name,
        categoryIds,
        description
    }: createBrandType
) => {
    return prisma.brand.create({
        data: {
            userId,
            name,
            description,
            categoriesBrands: {
                create: categoryIds.map((id) => ({
                    category: {
                        connect: { id }
                    }
                }))
            }
        }
    })
}

export const getAllBrandsDao = () => {
    return prisma.brand.findMany({
        include: {
            categoriesBrands: {
                include: {
                    category: true
                }
            }
        }
    });
}

export const getBrandByIdDao = (id: string) => {
    return prisma.brand.findUnique({
        where: {
            id
        },
        include: {
            categoriesBrands: {
                include: {
                    category: true
                }
            }
        }
    });
}

export const updateBrandDao = ({
    brandId,
    name,
    description
}: updateBrandType
) => {
    return prisma.brand.update({
        where: { id: brandId },
        data: {
            name,
            description
        }
    })
}

export const deleteBrandDao = async (id: string) => {
    await prisma.brand.delete({
        where: { id }
    })
}
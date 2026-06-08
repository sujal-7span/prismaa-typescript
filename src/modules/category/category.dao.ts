import { prisma } from "../../lib/prisma.js";
import { createCategoryType, updateCategoryType } from "./category.types.js";

export const createCategoryDao = ({
    name,
    description
}: createCategoryType
) => {
    return prisma.category.create({
        data: {
            name,
            description,
        }
    })
}

export const getAllCategoriesDao = () => {
    return prisma.category.findMany({
        include: {
            categoriesBrands: {
                include: {
                    brand: true
                }
            }
        }
    });
}

export const getCategoryByIdDao = (id: string) => {
    return prisma.category.findUnique({
        where: { id },
        include: {
            categoriesBrands: {
                include: {
                    brand: true
                }
            }
        }
    });
}

export const updateCategoryDao = ({
    id,
    name,
    description
}: updateCategoryType
) => {
    return prisma.category.update({
        where: { id },
        data: {
            name,
            description
        }
    })
}

export const deleteCategoryDao = async (id: string) => {
    await prisma.category.delete({
        where: { id }
    })
}

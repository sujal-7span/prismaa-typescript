import { createCategoryDao, deleteCategoryDao, getAllCategoriesDao, getCategoryByIdDao, updateCategoryDao } from "./category.dao.js";
import { createCategoryType, updateCategoryType } from "./category.types.js";

export const createCategoryService = async ({
    name,
    description
}: createCategoryType
) => {
    const category = await createCategoryDao({ name, description });
    return category;
}

export const getAllCategoriesService = async () => {
    const categories = await getAllCategoriesDao();
    return categories;
}

export const getCategoryByIdService = async (categoryId: string) => {
    const category = await getCategoryByIdDao(categoryId);
    return category;
}

export const updateCategoryService = async ({
    id,
    name,
    description
}: updateCategoryType
) => {
    const category = await updateCategoryDao({ id, name, description });
    return category;
}

export const deleteCategoryService = async (categoryId: string) => {
    await deleteCategoryDao(categoryId);
}

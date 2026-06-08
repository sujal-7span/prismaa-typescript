import { Request, Response } from "express";
import { createCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService, deleteCategoryService } from "./category.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        await createCategoryService({ name, description });
        return successResponse(res, 201, "Category created successfully");
    } catch (error) {
        return errorResponse(res, error, 409)
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategoriesService();
        return successResponse(res, 200, "Categories retrieved successfully", categories);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id as string;
        const category = await getCategoryByIdService(categoryId);
        return successResponse(res, 200, "Category retrieved successfully", category);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { name, description } = req.body;
        await updateCategoryService({ id, name, description });
        return successResponse(res, 200, "Category updated successfully");
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id as string;
        await deleteCategoryService(categoryId);
        return successResponse(res, 200, "Category deleted successfully");
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

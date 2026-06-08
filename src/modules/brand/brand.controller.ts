import { Request, Response } from "express";
import { createBrandService, getAllBrandsService, getBrandByIdService, updateBrandService, deleteBrandService } from "./brand.service.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export const createBrand = async (req: Request, res: Response) => {
    try {
        const { name, description, categoryIds } = req.body
        await createBrandService(req.user!, { name, description, categoryIds });
        return successResponse(res, 201, "Brand created successfully")
    } catch (error) {
        return errorResponse(res, error, 409)
    }
}

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await getAllBrandsService();
        return successResponse(res, 200, "Brands retrieved successfully", brands);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id as string;
        const brand = await getBrandByIdService(brandId);
        return successResponse(res, 200, "Brand retrieved successfully", brand);
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const authUser = req.user!
        const brandId = req.params.id as string;
        const { name, description } = req.body
        await updateBrandService(authUser, { brandId, name, description });
        return successResponse(res, 200, "Brand updated successfully");
    } catch (error) {
        return errorResponse(res, error, 400)
    }
}

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id as string;
        await deleteBrandService(req.user!, brandId);
        return successResponse(res, 200, "Brand deleted successfully");
    } catch (error) {
        return errorResponse(res, error, 400)

    }
}
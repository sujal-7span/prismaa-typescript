import { Request, Response } from "express";
import { brandService } from "./brand.service.js";

export const createBrand = async (req: Request, res: Response) => {
    try {
        const brand = await brandService.createBrand(req.user!, req.body);

        return res
            .status(201)
            .json({ message: "Brand created successfully", data: brand });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unexpected error occurred" })
    }
}

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        const brands = await brandService.getAllBrands();
        return res.status(200).json({ message: "Brands retrieved successfully", data: brands });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unexpected error occurred" })
    }
}

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id as string;
        const brand = await brandService.getBrandById(brandId);
        return res.status(200).json({ message: "Brand retrieved successfully", data: brand });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unexpected error occurred" })
    }
}

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id as string;
        const updatedBrand = await brandService.updateBrand(brandId, req.body);
        return res.status(200).json({ message: "Brand updated successfully", data: updatedBrand });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unexpected error occurred" })
    }
}

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const brandId = req.params.id as string;
        await brandService.deleteBrand(req.user!, brandId);
        return res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        return res.status(500).json({ message: "An unexpected error occurred" })
    }
}
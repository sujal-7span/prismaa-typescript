import { AuthUser } from "../../utils/authuser.js";
import { createBrandDao, deleteBrandDao, getAllBrandsDao, getBrandByIdDao, updateBrandDao } from "./brand.dao.js";

const createBrand = async (
    currentUser: AuthUser,
    data: {
        name: string;
        description?: string;
    }) => {
    const { name, description } = data;

    const brand = await createBrandDao(currentUser.id, name, description)

    return brand;
}

const getAllBrands = async () => {
    const brands = await getAllBrandsDao();
    return brands;
}

const getBrandById = async (brandId: string) => {
    const brand = await getBrandByIdDao(brandId);
    return brand;
}

const updateBrand = async (
    userId: string,
    data: {
        name?: string;
        description?: string
    }) => {
    const brand = await updateBrandDao(userId, data)
    return brand;
}

const deleteBrand = async (
    currentUser: AuthUser,
    brandId: string
) => {
    const brand = await getBrandByIdDao(brandId);
    if (!brand) {
        throw new Error("Brand not found");
    }

    if (brand.userId !== currentUser.id && currentUser.role !== "ADMIN") {
        throw new Error("Unauthorized to delete this brand");
    }
    await deleteBrandDao(brandId);
}

export const brandService = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}
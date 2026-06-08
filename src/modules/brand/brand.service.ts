import { AuthUser } from "../../utils/authuser.js";
import { createBrandDao, deleteBrandDao, getAllBrandsDao, getBrandByIdDao, updateBrandDao } from "./brand.dao.js";
import { createBrandType, updateBrandType } from "./brand.types.js";

export const createBrandService = async (
    currentUser: AuthUser, {
        name,
        description,
        categoryIds
    }: createBrandType
) => {
    const brand =await createBrandDao(currentUser.id, { name, description, categoryIds })
    if(!brand){
        throw new Error("Brand not created")
    }
}

export const getAllBrandsService = async () => {
    const brands = await getAllBrandsDao();
    return brands;
}

export const getBrandByIdService = async (brandId: string) => {
    const brand = await getBrandByIdDao(brandId);
    return brand;
}

export const updateBrandService = async (
    authUser: AuthUser, {
        brandId,
        name,
        description
    }: updateBrandType
) => {
    const brand = await getBrandByIdDao(brandId);
    if (!brand) {
        throw new Error("Brand not found");
    }
    if (brand.userId !== authUser.id) {
        throw new Error("Unauthorized");
    }

    const updatedBrand = await updateBrandDao({
        brandId,
        name,
        description
    });
    return updatedBrand;
}

export const deleteBrandService = async (
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
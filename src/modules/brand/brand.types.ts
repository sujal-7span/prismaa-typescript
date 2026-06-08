
export interface createBrandType {
    name: string;
    description?: string;
    categoryIds: string[];
}

export interface updateBrandType {
    brandId: string;
    name?: string;
    description?: string;
}
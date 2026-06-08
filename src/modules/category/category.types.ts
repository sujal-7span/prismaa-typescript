export interface createCategoryType {
    name: string,
    description?: string,
}

export interface updateCategoryType {
    id: string;
    name?: string;
    description?: string;
}
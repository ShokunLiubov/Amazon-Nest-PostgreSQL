export interface IProductData {
    name: string
    description?: string
    price: number
    images: string[]
    categoryId: number
}

export type TypeDataFilters = {
    sort?: EnumProductSort
    searchItems?: string
    page?: string | number
    perPage?: string | number
}

export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRISE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest'
}
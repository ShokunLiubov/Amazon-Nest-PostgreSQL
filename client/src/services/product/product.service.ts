import { instance } from '@/api/api.interceptor'
import { IProduct } from '@/types/product.interface'
import { HttpMethods } from '../enum/httpMethods.enum'
import { IProductData, TypeDataFilters } from './productData.interface'

const PRODUCT = '/product'

export const ProductService = {
    async getAll(queryData = {} as TypeDataFilters) {
        return instance<IProduct[]>({
            url: PRODUCT,
            method: HttpMethods.GET,
            params: queryData
        })
    },
     
    async getById(id: string | number) {
        return instance<IProduct>({
            url: `${PRODUCT}/${id}`,
            method: HttpMethods.GET
        })
    },

    async getBySlug(slug: string) {
        return instance<IProduct>({
            url: `${PRODUCT}/by-slug/${slug}`,
            method: HttpMethods.GET
        })
    },

    async byCategory(category: string) {
        return instance<IProduct[]>({
            url: `${PRODUCT}/by-category/${category}`,
            method: HttpMethods.GET
        })
    },

    async getSimilar(id: string | number) {
        return instance<IProduct>({
            url: `${PRODUCT}/similar/${id}`,
            method: HttpMethods.GET
        })
    },

    async create(data: IProductData) {
        return instance<IProduct>({
            url: PRODUCT,
            method: HttpMethods.POST,
            data
        })
    },

    async update(id: string | number, data: IProductData) {
        return instance<IProduct>({
            url: `${PRODUCT}/${id}`,
            method: HttpMethods.PUT,
            data: { name }
        })
    },

    async delete(id: string | number) {
        return instance<IProduct>({
            url: `${PRODUCT}/${id}`,
            method: HttpMethods.DELETE,
        })
    },

}

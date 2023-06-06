import { axiosClassic, instance } from '@/api/api.interceptor'
import { ICategory } from '@/types/category.interface'
import { HttpMethods } from '../enum/httpMethods.enum'

const CATEGORIES = '/categories'

export const CategoryService = {
    async getAll() {
        return axiosClassic<ICategory[]>({
            url: CATEGORIES,
            method: HttpMethods.GET
        })
    },
     
    async getById(id: string | number) {
        return instance<ICategory>({
            url: `${CATEGORIES}/${id}`,
            method: HttpMethods.GET
        })
    },

    async getBySlug(slug: string) {
        return axiosClassic<ICategory>({
            url: `${CATEGORIES}/by-slug/${slug}`,
            method: HttpMethods.GET
        })
    },

    async create(name: string) {
        return axiosClassic<ICategory>({
            url: CATEGORIES,
            method: HttpMethods.POST,
            data: { name }
        })
    },

    async update(id: string | number, name: string) {
        return axiosClassic<ICategory>({
            url: `${CATEGORIES}/${id}`,
            method: HttpMethods.PUT,
            data: { name }
        })
    },

    async delete(id: string | number) {
        return axiosClassic<ICategory>({
            url: `${CATEGORIES}/${id}`,
            method: HttpMethods.DELETE,
        })
    },

}


import { instance } from '@/api/api.interceptor'
import { IOrder } from '@/types/order.interface'
import { HttpMethods } from '../enum/httpMethods.enum'

const ORDER = '/order'

export const OrderService = {
    async getAll() {
        return instance<IOrder[]>({
            url: ORDER,
            method: HttpMethods.GET
        })
    }
    
}
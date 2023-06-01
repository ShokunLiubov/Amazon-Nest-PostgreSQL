import { instance } from '@/api/api.interceptor'
import { IPaymentResponse } from '@/types/payment.interface'
import { HttpMethods } from '../enum/httpMethods.enum'

const PAYMENT = '/payment'

export const PaymentService = {
    async createPayment(amount: number) {
        return instance<IPaymentResponse>({
            url: PAYMENT,
            method: HttpMethods.POST,
            data: amount
        })
    }
    
}
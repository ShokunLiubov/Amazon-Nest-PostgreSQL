import { instance } from '@/api/api.interceptor'
import { IReview } from '@/types/review.interface'
import { HttpMethods } from '../enum/httpMethods.enum'
import { IReviewData } from './reviewData.interface'

const REVIEW = '/review'

export const ReviewService = {
    async getAll() {
        return instance<IReview[]>({
            url: REVIEW,
            method: HttpMethods.GET
        })
    },

    async leave(productId: string | number, data: IReviewData) {
        return instance<IReview>({
            url: `${REVIEW}/leave/${productId}`,
            method: HttpMethods.POST,
            data
        })
    },

    async getAverageValueByReview(productId: string | number) {
        return instance<IReview>({
            url: `${REVIEW}/rating/${productId}`,
            method: HttpMethods.GET
        })
    },

}


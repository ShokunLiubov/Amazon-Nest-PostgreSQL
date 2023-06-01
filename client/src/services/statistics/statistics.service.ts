import { instance } from '@/api/api.interceptor'
import { HttpMethods } from '../enum/httpMethods.enum'
import { IStatisticsResponse } from './statisticsResponse.interface'

const STATISTICS = '/statistics'

export const StatisticsService = {
    async getMain() {
        return instance<IStatisticsResponse>({
            url: `${STATISTICS}/main`,
            method: HttpMethods.GET
        })
    }
    
}
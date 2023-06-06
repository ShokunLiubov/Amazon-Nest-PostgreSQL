import { axiosClassic } from '@/api/api.interceptor'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'
import Cookies from 'js-cookie'
import { HttpMethods } from '../enum/httpMethods.enum'
import { saveToStorage } from './auth.helper'
import { EnumTokens } from './tokens.enum'

const AUTH = '/auth'

export const AuthService = {
    async main(type: 'login' | 'register', data: IEmailPassword) {
        const response = await axiosClassic<IAuthResponse>({
            url: `${AUTH}/${type}`,
            method: HttpMethods.POST,
            data
        })

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response.data
    },
    
    async getNewTokens() {
        const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)

        const response = await axiosClassic.post<string, {data: IAuthResponse}>(
            `${AUTH}/access-token`, { refreshToken }
        )

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response
    }   

}


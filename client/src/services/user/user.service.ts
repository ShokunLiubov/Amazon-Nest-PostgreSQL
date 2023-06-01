import { instance } from '@/api/api.interceptor'
import { IUser } from '@/types/user.interface'
import { HttpMethods } from '../enum/httpMethods.enum'
import { IUserData } from './userData.interface'

const USERS = '/users'

export const UserService = {
    async getProfile() {
        return instance<IUser[]>({
            url: `${USERS}/profile`,
            method: HttpMethods.GET
        })
    },

    async updateProfile(data: IUserData) {
        return instance<IUser>({
            url: `${USERS}/profile`,
            method: HttpMethods.PUT,
            data
        })
    },
     
    async toggleFavorites(productId: string | number) {
        return instance<IUser>({
            url: `${USERS}/profile/favorites/${productId}`,
            method: HttpMethods.PATCH
        })
    },

}


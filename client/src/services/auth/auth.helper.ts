import { IAuthResponse, ITokens } from '@/store/user/user.interface'
import Cookies from 'js-cookie'
import { EnumTokens } from './tokens.enum'

export const getAccessStorage = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}

export const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokenStorage = (data: ITokens) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, data.accessToken)
    Cookies.set(EnumTokens.REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
    Cookies.remove(EnumTokens.REFRESH_TOKEN)
    localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokenStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}
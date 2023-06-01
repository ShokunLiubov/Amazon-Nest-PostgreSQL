import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'


const initialState: IInitialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: build => {
        // register
        build
            .addCase(register.pending, state => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(register.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            //login
            .addCase(login.pending, state => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.user = payload.user
            })
            .addCase(login.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            // logout
            .addCase(logout.fulfilled, state => {
                state.isLoading = false
                state.user = null
            })
            //check auth
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.user = payload.user
            })
    }
})
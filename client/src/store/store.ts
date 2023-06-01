import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userSlice } from './user/user.slice'

//save data in localStorage
const persistConfig = {
    key: 'amazon',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer) 

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [ FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE ]
        }
    })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
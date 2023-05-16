import { configureStore } from '@reduxjs/toolkit'
import { dictionaryApi } from '../services/dictionary'

export const store = configureStore({
    reducer: {
        [dictionaryApi.reducerPath]: dictionaryApi.reducer,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware().concat(dictionaryApi.middleware),
})
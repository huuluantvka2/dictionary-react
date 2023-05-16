import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dictionaryApi = createApi({
    reducerPath: 'dictionaryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.dictionaryapi.dev/api/v2' }),
    endpoints: (builder) => ({
        getWords: builder.query<any, string>({
            query: (word) => `/entries/en/${word}`,
        }),
    }),
})
export const { useGetWordsQuery, useLazyGetWordsQuery } = dictionaryApi;
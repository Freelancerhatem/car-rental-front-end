import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../features/store";
import { createApi } from "@reduxjs/toolkit/query/react";
// https://assignment-3-car-rental.vercel.app
const baseQuery = fetchBaseQuery({
    baseUrl: "https://assignment-3-car-rental.vercel.app/api/auth",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers
    }
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    endpoints: () => ({})
})
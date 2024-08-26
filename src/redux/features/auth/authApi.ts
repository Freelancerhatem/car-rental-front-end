import { baseApi } from "../../api/baseApi";
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: '/',
                method: 'POST',
                body: credentials
            })
        }),
        signUp: builder.mutation({
            query: (userInfo) => ({
                url: '/signup',
                method: 'POST',
                body: userInfo
            })
        }),
    })
})


export const { useSignInMutation, useSignUpMutation } = authApi
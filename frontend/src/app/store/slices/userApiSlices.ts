import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseUserUrl } from "@/app/constants/api";
import { HttpMethod } from "@/app/schema/httpMethods";

export const userApiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl : baseUserUrl,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        registerPost : builder.mutation({
            query: (postData) => ({
                url:"/register",
                method: HttpMethod.POST,
                body: postData
            })
        }),
        loginPost : builder.mutation({
            query : (postData) => ({
                url: '/login',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        verifyOtp: builder.mutation({
            query:(postData) => ({
                url: '/verify-otp',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        adminLogin : builder.mutation({
            query: (postData) => ({
                url:'/adminLogin',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getUsers: builder.query({
            query:() => ({
                url: '/get-users',
            })
        })
    })
})

export const {
    useRegisterPostMutation,
    useLoginPostMutation,
    useVerifyOtpMutation,
    useAdminLoginMutation,
    useGetUsersQuery
} = userApiSlice;
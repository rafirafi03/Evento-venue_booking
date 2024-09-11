import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseCompanyUrl } from "@/app/constants/api";
import { HttpMethod } from "@/app/schema/httpMethods";

export const companyApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseCompanyUrl,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerPost : builder.mutation({
            query: (postData) => ({
                url: '/register',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        confirmOtp : builder.mutation({
            query: (postData) => ({
                url: '/confirm-otp',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        resendOtp : builder.mutation({
            query: (postData) => ({
                url: '/resendOtp', 
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getCompanies : builder.query({
            query: () => ({
                url: '/getCompanies',
            })
        })
    })
})

export const {
    useRegisterPostMutation,
    useConfirmOtpMutation,
    useResendOtpMutation
} = companyApiSlice
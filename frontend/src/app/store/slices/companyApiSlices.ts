import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseCompanyUrl } from "../../constants/api";
import { HttpMethod } from "../../schema/httpMethods";

export const companyApiSlice = createApi({
    reducerPath: 'companyApi',
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
        loginPost : builder.mutation({
            query: (postData) => ({
                url: '/loginCompany',
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
        }),
        getRequests : builder.query({
            query: () => ({
                url: '/getRequests'
            })
        }),
        blockCompany : builder.mutation({
            query: (postData) => ({
                url: '/blockCompany',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        companyApproval : builder.mutation({
            query: (postData) => ({
                url: '/companyApproval',
                method: HttpMethod.PATCH,
                body: postData
            })
        }),
        addVenue : builder.mutation({
            query: (postData) => ({
                url: '/addVenue',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getVenues: builder.query({
            query: () => ({
                url: '/getVenues'
            })
        }),
        updateVenueStatus : builder.mutation({
            query: (postData) => ({
                url: '/venueStatus',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getListedVenues: builder.query({
            query: () => ({
                url: '/getListedVenues'
            })
        }),
    })
})

export const {
    useRegisterPostMutation,
    useLoginPostMutation,
    useConfirmOtpMutation,
    useResendOtpMutation,
    useGetCompaniesQuery,
    useGetRequestsQuery,
    useBlockCompanyMutation,
    useCompanyApprovalMutation,
    useAddVenueMutation,
    useGetVenuesQuery,
    useUpdateVenueStatusMutation,
    useGetListedVenuesQuery
} = companyApiSlice
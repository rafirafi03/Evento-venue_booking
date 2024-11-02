import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { baseUserUrl } from "../../constants/api";
import { HttpMethod } from "../../constants/httpMethods";

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
        resendOtp: builder.mutation({
            query:(postData) => ({
                url: '/resend-otp',
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
        }),
        getUserDetails: builder.query({
            query:(userId) => ({
                url: `/getUserDetails/${userId}`,
                method: HttpMethod.GET
            })
        }),
        blockUser: builder.mutation({
            query:(postData) => ({
                url: '/blockUser',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        editUserProfile: builder.mutation({
            query:(postData) => ({
                url: '/editUserProfile',
                method: HttpMethod.PATCH,
                body: postData
            })
        }),
        resetPassword: builder.mutation({
            query: (patchData) => ({
                url: '/resetPassword',
                method: HttpMethod.PATCH,
                body: patchData
            })
        }),
        addToFavourites: builder.mutation({
            query: (postData) => ({
                url: '/addToFavourites',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        checkIfFavourited: builder.query({
            query: ({userId, venueId}) => ({
                url: `/checkFavourites/${userId}/${venueId}`,
                method: HttpMethod.GET
            })
        }),
        getFavourites: builder.query({
            query:(userId)=>({
                url: `/getFavourites/${userId}`
            })
        }),
        deleteFromFavourites: builder.mutation({
            query: ({userId, venueId})=> ({
                url: `/deleteFromFavourites/${userId}/${venueId}`,
                method: HttpMethod.DELETE
            })
        }),
        forgetPasswordRequest: builder.mutation({
            query: (email) => ({
                url: '/forgetPasswordRequest',
                method: HttpMethod.POST,
                body: email
            })
        }),
        changePassword: builder.mutation({
            query:(data) => ({
                url: '/changePassword',
                method: HttpMethod.PUT,
                body: data
            })
        })
    })
})

export const {
    useRegisterPostMutation,
    useLoginPostMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useAdminLoginMutation,
    useGetUsersQuery,
    useBlockUserMutation,
    useEditUserProfileMutation,
    useGetUserDetailsQuery,
    useResetPasswordMutation,
    useAddToFavouritesMutation,
    useCheckIfFavouritedQuery,
    useGetFavouritesQuery,
    useDeleteFromFavouritesMutation,
    useForgetPasswordRequestMutation,
    useChangePasswordMutation
} = userApiSlice;
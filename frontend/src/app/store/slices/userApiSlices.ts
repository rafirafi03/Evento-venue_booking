import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants/api";
import { HttpMethod } from "../../constants/httpMethods";

export const userApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerPost: builder.mutation({
      query: (postData) => ({
        url: "/user/register",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    loginPost: builder.mutation({
      query: (postData) => ({
        url: "/user/login",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    googleLogin: builder.mutation({
      query: (googleToken) => ({
        url: '/user/googleLogin',
        method: HttpMethod.POST,
        body: {token: googleToken}
      })
    }),
    verifyOtp: builder.mutation({
      query: (postData) => ({
        url: "/user/verify-otp",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    resendOtp: builder.mutation({
      query: (postData) => ({
        url: "/user/resend-otp",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    adminLogin: builder.mutation({
      query: (postData) => ({
        url: "/user/adminLogin",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    getUsers: builder.query({
      query: (params = {}) => {
        // Create URLSearchParams instance
        const queryParams = new URLSearchParams();

        // Add search if it exists
        if (params.search) {
          queryParams.set("search", params.search);
        }

        return {
          url: queryParams.toString()
            ? `/user/get-users?${queryParams.toString()}`
            : "/user/get-users",
          method: HttpMethod.GET,
        };
      },
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `/user/getUserDetails/${userId}`,
        method: HttpMethod.GET,
      }),
    }),
    blockUser: builder.mutation({
      query: (postData) => ({
        url: "/user/blockUser",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    editUserProfile: builder.mutation({
      query: (postData) => ({
        url: "/user/editUserProfile",
        method: HttpMethod.PATCH,
        body: postData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (patchData) => ({
        url: "/user/resetPassword",
        method: HttpMethod.PATCH,
        body: patchData,
      }),
    }),
    addToFavourites: builder.mutation({
      query: (postData) => ({
        url: "/user/addToFavourites",
        method: HttpMethod.POST,
        body: postData,
      }),
    }),
    checkIfFavourited: builder.query({
      query: ({ userId, venueId }) => ({
        url: `/user/checkFavourites/${userId}/${venueId}`,
        method: HttpMethod.GET,
      }),
    }),
    getFavourites: builder.query({
      query: (userId) => ({
        url: `/user/getFavourites/${userId}`,
      }),
    }),
    deleteFromFavourites: builder.mutation({
      query: ({ userId, venueId }) => ({
        url: `/user/deleteFromFavourites/${userId}/${venueId}`,
        method: HttpMethod.DELETE,
      }),
    }),
    forgetPasswordRequest: builder.mutation({
      query: (email) => ({
        url: "/user/forgetPasswordRequest",
        method: HttpMethod.POST,
        body: email,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/changePassword",
        method: HttpMethod.PUT,
        body: data,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "/user/userLogout",
        method: HttpMethod.POST,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: "/user/adminLogout",
        method: HttpMethod.POST,
      }),
    }),
  }),
});

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
  useChangePasswordMutation,
  useUserLogoutMutation,
  useAdminLogoutMutation,
  useGoogleLoginMutation
} = userApiSlice;

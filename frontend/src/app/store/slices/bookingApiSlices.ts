import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants/api";
import { HttpMethod } from "../../constants/httpMethods";

export const bookingApiSlices = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        makePayment: builder.mutation({
            query: (postData) => ({
                url: '/booking/makePayment',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getUserBookings: builder.query({
            query: (userId) => ({
                url: `/booking/getUserBookings/${userId}`,
                method: HttpMethod.GET
            })
        }),
        getCompanyBookings: builder.query({
            query: (companyId) => ({
                url: `/booking/getCompanyBookings/${companyId}`,
                method: HttpMethod.GET
            })
        }),
        cancelBooking: builder.mutation({
            query: (bookingId) => ({
                url: '/booking/cancelBooking',
                method: HttpMethod.DELETE,
                body: bookingId
            })
        })
    })
});

export const {
    useMakePaymentMutation,
    useGetUserBookingsQuery,
    useCancelBookingMutation,
    useGetCompanyBookingsQuery
} = bookingApiSlices;

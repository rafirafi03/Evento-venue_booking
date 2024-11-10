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
        })
    })
});

export const {
    useMakePaymentMutation
} = bookingApiSlices;

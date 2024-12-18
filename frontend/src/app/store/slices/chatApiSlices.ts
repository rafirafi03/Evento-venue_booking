import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants/api";
import { HttpMethod } from "../../constants/httpMethods";

export const chatApiSlices = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (data) => ({
        url: "/chat/getMessages",
        method: HttpMethod.GET,
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery } = chatApiSlices;

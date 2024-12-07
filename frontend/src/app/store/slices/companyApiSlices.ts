import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../constants/api";
import { HttpMethod } from "../../constants/httpMethods";

export const companyApiSlice = createApi({
    reducerPath: 'companyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerPost: builder.mutation({
            query: (postData) => ({
                url: '/company/register',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        loginPost: builder.mutation({
            query: (postData) => ({
                url: '/company/loginCompany',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        confirmOtp: builder.mutation({
            query: (postData) => ({
                url: '/company/confirm-otp',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        resendOtp: builder.mutation({
            query: (postData) => ({
                url: '/company/resendOtp', 
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getCompanies: builder.query({
            query: () => ({
                url: '/company/getCompanies',
            })
        }),
        getRequests: builder.query({
            query: () => ({
                url: '/company/getRequests'
            })
        }),
        blockCompany: builder.mutation({
            query: (postData) => ({
                url: '/company/blockCompany',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        companyApproval: builder.mutation({
            query: (postData) => ({
                url: '/company/companyApproval',
                method: HttpMethod.PATCH,
                body: postData
            })
        }),
        addVenue: builder.mutation({
            query: (postData) => ({
                url: '/company/addVenue',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getVenues: builder.query({
            query: (companyId) => ({
                url: `/company/getVenues/${companyId}`
            })
        }),
        updateVenueStatus: builder.mutation({
            query: (postData) => ({
                url: '/company/venueStatus',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getListedVenues: builder.query({
            query: (params = {}) => {
              // Create URLSearchParams instance
              const queryParams = new URLSearchParams();
          
              // Add search if it exists
              if (params.search) {
                queryParams.set('search', params.search);
              }
          
              // Add types if they exist
              if (params.types && params.types.length > 0) {
                queryParams.set('types', params.types.join(','));
              }
          
              // Return the query configuration
              return {
                url: queryParams.toString() 
                  ? `/company/getListedVenues?${queryParams.toString()}` 
                  : '/company/getListedVenues',
                method: HttpMethod.GET
              };
            }
          }),
        getVenueDetails: builder.query({
            query: (id) => ({
                url: `/company/getVenueDetails/${id}`,
                method: HttpMethod.GET
            })
        }),
        editVenue: builder.mutation({
            query: (data) => ({
                url: '/company/editVenue',
                method: HttpMethod.PUT,
                body: data
            })
        }),
        deleteVenue: builder.mutation({
            query: (venueId) => ({
                url: `/company/deleteVenue/${venueId}`,
                method: HttpMethod.DELETE,
            }),
        }),
        getCompanyDetails: builder.query({
            query: (companyId) => ({
                url: `/company/getCompanyDetails/${companyId}`,
                method: HttpMethod.GET,
            }),
        }),
        editCompanyProfile: builder.mutation({
            query: (data) => ({
                url: '/company/editCompanyProfile',
                method: HttpMethod.PATCH,
                body: data
            })
        }),
        addOffer: builder.mutation({
            query: (postData) => ({
                url: '/company/addOffer',
                method: HttpMethod.POST,
                body: postData
            })
        }),
        getOffers: builder.query({
            query: (companyId) => ({
                url: `/company/getOffers/${companyId}`,
            })
        }),
        deleteOffer: builder.mutation({
            query: (offerId) => ({
                url: `/company/deleteOffer/${offerId}`,
                method: HttpMethod.DELETE
            })
        }),
        applyOffer: builder.mutation({
            query: (datas) => ({
                url: '/company/applyOffer',
                method: HttpMethod.PATCH,
                body: datas
            })
        }),
        removeOffer: builder.mutation({
            query: (venueId) => ({
                url: `/company/removeOffer/${venueId}`,
                method: HttpMethod.PATCH
            })
        }),
        getDashboardDetails: builder.query({
            query: (companyId) => ({
                url: `/company/getDashboardDetails?${companyId}`,
                method: HttpMethod.GET
            })
        })
    })
});

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
    useGetListedVenuesQuery,
    useGetVenueDetailsQuery,
    useEditVenueMutation,
    useDeleteVenueMutation,
    useGetCompanyDetailsQuery,
    useEditCompanyProfileMutation,
    useAddOfferMutation,
    useGetOffersQuery,
    useDeleteOfferMutation,
    useApplyOfferMutation,
    useRemoveOfferMutation,
    useGetDashboardDetailsQuery
} = companyApiSlice;

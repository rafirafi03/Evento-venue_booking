import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./slices/userApiSlices";
import { companyApiSlice } from "./slices/companyApiSlices";
import { bookingApiSlices } from "./slices/bookingApiSlices";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
    [bookingApiSlices.reducerPath]: bookingApiSlices.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware,companyApiSlice.middleware,bookingApiSlices.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./slices/userApiSlices";
import { companyApiSlice } from "./slices/companyApiSlices";
import { bookingApiSlices } from "./slices/bookingApiSlices";
import { chatApiSlices } from "./slices/chatApiSlices";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
    [bookingApiSlices.reducerPath]: bookingApiSlices.reducer,
    [chatApiSlices.reducerPath]: chatApiSlices.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware,companyApiSlice.middleware,bookingApiSlices.middleware, chatApiSlices.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./slices/userApiSlices";
import { companyApiSlice } from "./slices/companyApiSlices";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware,companyApiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

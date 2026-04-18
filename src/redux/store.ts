/** @format */

import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "@/redux/api/baseAPI";
import authReducer from "@/redux/features/auth/authSlice";
import dashboardReducer from "@/redux/features/dashboard/dashboardSlice";
import earningsReducer from "@/redux/features/earnings/earningsSlice";
import fieldOwnerReducer from "@/redux/features/fieldOwner/fieldOwnerSlice";
export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    earnings: earningsReducer,
    fieldOwner: fieldOwnerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

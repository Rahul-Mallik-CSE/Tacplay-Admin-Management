/** @format */

import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "@/redux/api/baseAPI";
import authReducer from "@/redux/features/auth/authSlice";
import {
  clearAuthSession,
  setAuthSession,
} from "@/redux/features/auth/authSlice";
import dashboardReducer from "@/redux/features/dashboard/dashboardSlice";
import earningsReducer from "@/redux/features/earnings/earningsSlice";
import fieldOwnerReducer from "@/redux/features/fieldOwner/fieldOwnerSlice";
import playerReducer from "@/redux/features/player/playerSlice";
import sessionManagementReducer from "@/redux/features/sessionManagement/sessionManagementSlice";
import { clearAuthUser, saveAuthUser } from "@/lib/auth";

const authUserCookieSyncMiddleware =
  () => (next: (action: unknown) => unknown) => (action: unknown) => {
    if (setAuthSession.match(action)) {
      saveAuthUser(action.payload);
    }

    if (clearAuthSession.match(action)) {
      clearAuthUser();
    }

    return next(action);
  };

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    earnings: earningsReducer,
    fieldOwner: fieldOwnerReducer,
    player: playerReducer,
    sessionManagement: sessionManagementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authUserCookieSyncMiddleware,
      baseAPI.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

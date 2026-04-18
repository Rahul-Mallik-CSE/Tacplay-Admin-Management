/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DashboardPeriod } from "@/types/DashboardTypes";

type DashboardState = {
  selectedPeriod: DashboardPeriod;
};

const initialState: DashboardState = {
  selectedPeriod: "month",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setOverviewPeriod: (state, action: PayloadAction<DashboardPeriod>) => {
      state.selectedPeriod = action.payload;
    },
  },
});

export const { setOverviewPeriod } = dashboardSlice.actions;

export default dashboardSlice.reducer;

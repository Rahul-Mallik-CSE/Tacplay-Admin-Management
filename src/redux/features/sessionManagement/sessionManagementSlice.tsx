/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionManagementListState = {
  search: string;
  page: number;
  limit: number;
  status: string;
  matchType: string;
};

type SessionManagementState = {
  list: SessionManagementListState;
};

const initialState: SessionManagementState = {
  list: {
    search: "",
    page: 1,
    limit: 10,
    status: "all",
    matchType: "all",
  },
};

const sessionManagementSlice = createSlice({
  name: "sessionManagement",
  initialState,
  reducers: {
    setSessionManagementSearch: (state, action: PayloadAction<string>) => {
      state.list.search = action.payload;
      state.list.page = 1;
    },
    setSessionManagementPage: (state, action: PayloadAction<number>) => {
      state.list.page = action.payload;
    },
    setSessionManagementLimit: (state, action: PayloadAction<number>) => {
      state.list.limit = action.payload;
      state.list.page = 1;
    },
    setSessionManagementStatus: (state, action: PayloadAction<string>) => {
      state.list.status = action.payload;
      state.list.page = 1;
    },
    setSessionManagementMatchType: (state, action: PayloadAction<string>) => {
      state.list.matchType = action.payload;
      state.list.page = 1;
    },
  },
});

export const {
  setSessionManagementSearch,
  setSessionManagementPage,
  setSessionManagementLimit,
  setSessionManagementStatus,
  setSessionManagementMatchType,
} = sessionManagementSlice.actions;

export default sessionManagementSlice.reducer;

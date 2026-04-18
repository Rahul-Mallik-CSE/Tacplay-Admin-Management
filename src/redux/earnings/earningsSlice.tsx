/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EarningsState = {
  search: string;
  page: number;
  limit: number;
};

const initialState: EarningsState = {
  search: "",
  page: 1,
  limit: 10,
};

const earningsSlice = createSlice({
  name: "earnings",
  initialState,
  reducers: {
    setEarningsSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setEarningsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setEarningsLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.page = 1;
    },
  },
});

export const { setEarningsSearch, setEarningsPage, setEarningsLimit } =
  earningsSlice.actions;

export default earningsSlice.reducer;

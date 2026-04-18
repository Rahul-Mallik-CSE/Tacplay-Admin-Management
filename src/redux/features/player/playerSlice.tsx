/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayerListState = {
  search: string;
  page: number;
  limit: number;
};

type PlayerDetailState = {
  search: string;
  page: number;
  limit: number;
};

type PlayerState = {
  list: PlayerListState;
  detail: PlayerDetailState;
};

const initialState: PlayerState = {
  list: {
    search: "",
    page: 1,
    limit: 10,
  },
  detail: {
    search: "",
    page: 1,
    limit: 2,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerListSearch: (state, action: PayloadAction<string>) => {
      state.list.search = action.payload;
      state.list.page = 1;
    },
    setPlayerListPage: (state, action: PayloadAction<number>) => {
      state.list.page = action.payload;
    },
    setPlayerListLimit: (state, action: PayloadAction<number>) => {
      state.list.limit = action.payload;
      state.list.page = 1;
    },
    setPlayerDetailSearch: (state, action: PayloadAction<string>) => {
      state.detail.search = action.payload;
      state.detail.page = 1;
    },
    setPlayerDetailPage: (state, action: PayloadAction<number>) => {
      state.detail.page = action.payload;
    },
    setPlayerDetailLimit: (state, action: PayloadAction<number>) => {
      state.detail.limit = action.payload;
      state.detail.page = 1;
    },
  },
});

export const {
  setPlayerListSearch,
  setPlayerListPage,
  setPlayerListLimit,
  setPlayerDetailSearch,
  setPlayerDetailPage,
  setPlayerDetailLimit,
} = playerSlice.actions;

export default playerSlice.reducer;

/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FieldOwnerListState = {
  search: string;
  page: number;
  limit: number;
};

type FieldOwnerDetailState = {
  search: string;
  page: number;
  limit: number;
};

type FieldOwnerState = {
  list: FieldOwnerListState;
  detail: FieldOwnerDetailState;
};

const initialState: FieldOwnerState = {
  list: {
    search: "",
    page: 1,
    limit: 10,
  },
  detail: {
    search: "",
    page: 1,
    limit: 5,
  },
};

const fieldOwnerSlice = createSlice({
  name: "fieldOwner",
  initialState,
  reducers: {
    setFieldOwnerListSearch: (state, action: PayloadAction<string>) => {
      state.list.search = action.payload;
      state.list.page = 1;
    },
    setFieldOwnerListPage: (state, action: PayloadAction<number>) => {
      state.list.page = action.payload;
    },
    setFieldOwnerListLimit: (state, action: PayloadAction<number>) => {
      state.list.limit = action.payload;
      state.list.page = 1;
    },
    setFieldOwnerDetailSearch: (state, action: PayloadAction<string>) => {
      state.detail.search = action.payload;
      state.detail.page = 1;
    },
    setFieldOwnerDetailPage: (state, action: PayloadAction<number>) => {
      state.detail.page = action.payload;
    },
    setFieldOwnerDetailLimit: (state, action: PayloadAction<number>) => {
      state.detail.limit = action.payload;
      state.detail.page = 1;
    },
  },
});

export const {
  setFieldOwnerListSearch,
  setFieldOwnerListPage,
  setFieldOwnerListLimit,
  setFieldOwnerDetailSearch,
  setFieldOwnerDetailPage,
  setFieldOwnerDetailLimit,
} = fieldOwnerSlice.actions;

export default fieldOwnerSlice.reducer;

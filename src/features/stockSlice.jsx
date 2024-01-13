import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  products: [],
  purchases: [],
  brands: [],
  loading: false,
  error: false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    getFirmsSuccess: (state, { payload }) => {
      state.firms = payload;
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export default stockSlice;

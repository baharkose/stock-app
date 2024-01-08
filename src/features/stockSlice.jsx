import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: [],
  products: [],
  purchases: [],
  brands: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
});
export default stockSlice;

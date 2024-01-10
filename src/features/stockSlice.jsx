import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firms: "",
  products: [],
  purchases: [],
  brands: [],
  loading:false,
  error:false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) 
  },
});
export default stockSlice;

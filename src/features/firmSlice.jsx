// {
//     "name": "Firm 1",
//     "phone": "999 88 77",
//     "address": "Address",
//     "image": "http://imageURL"
//   }

import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  firms: "",
  loading: false,
  error: false,
  token: "",
};

export const firmSlice = createSlice({
  name: "firm",
  initalState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    firmSuccess: (state, { payload }) => {
      state.loading = false;
      state.firms = payload;
      state.token = payload.token;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {fetchStart,firmSuccess, fetchFail} = firmSlice.actions

export default firmSlice

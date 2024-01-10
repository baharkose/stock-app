import React from "react";
import { useDispatch } from "react-redux";
// import { fetchStart, registerSuccess } from "../features/authSlice";
import axios from "axios";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { fetchFail, fetchStart, firmSuccess } from "../features/firmSlice";

const useFirm = () => {
  const axiosWithToken = useAxios();
  const dispatch = useDispatch();

  const getFirms = async () => {
    try {
      const { data } = await axiosWithToken.get("/firms");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createFirm = async (firmInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/firms/", firmInfo);

      dispatch(firmSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Adding is failed");
      console.log(error);
    }
  };

  return { createFirm };
};

export default useFirm;

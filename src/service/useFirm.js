import React from "react";
import { useDispatch } from "react-redux";
import { fetchStart, registerSuccess } from "../features/authSlice";
import axios from "axios";

const useFirm = () => {
  const dispatch = useDispatch();

  const createFirm = async (firmInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/firms/", firmInfo);
      dispatch(firmSuccess);
    } catch (error) {}
  };

  return {};
};

export default useFirm;

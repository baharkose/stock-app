import React from "react";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import { fetchStart } from "../features/firmSlice";
import getFirmsSuccess from "../features/stockSlice"

const useStockCalls = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getFirms = async () => {
    fetchStart();
    try {
      const { data } = await axiosWithToken("/firms/");
      //   veri geldiyse bir dispatch yayınlamamız lazım.

      dispatch(getFirmsSuccess(data));

      toastSuccessNotify("adding is successful");
    } catch (error) {
      toastErrorNotify("adding is failed");
    }
  };
  return { getFirms };
};

export default useStockCalls;

// projenin her hangi bir yerinde doğrudan çağırıp kullanabilmemizi sağlar. Proje genelinde kullanılacak programlar için ve içerisinde hook kullanılacak olan yapılar için çözüm custom hook kullanmaktır. Api güvenlikli bir api olduğu için tüm üut delete gibi isteklerde token kullanmamız gerekir.

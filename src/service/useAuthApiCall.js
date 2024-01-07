import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";

// const url = "https://17134.fullstack.clarusway.com/users/"

// - dışarıda kullanıcaz. içeride jsx elementleri kullanamadığımız için burayı bizim custom hook alanına çevirmemiz lazım. dispatch de bir hooktur custom hooktur. Nasıl yapıcaz bunu bir adı use ile başlamalı. 2- fonksiyon yazar gibi

const useAuthApiCall = () => {
  // - export olmaz return ile olur.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userInfo) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userInfo
      );

      console.log(data);
      toastSuccessNotify("login işlemi başarılı");
      navigate("/stock");

      try {
        console.log(data.data);
      } catch (error) {
        console.log(error);
        toastErrorNotify("login işlemi başarısız oldu");
      }
    } catch (error) {
      console.log(error);
      toastErrorNotify("login işlemi başarısız oldu");
    }
  };

  const register = () => {};
  const logout = () => {};

  return { login, register, logout };
  // - bu şekilde export edilir.
};

export default useAuthApiCall;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";

//+ 2 buradaki amacımız bizim login, logout, register gibi istekler yazmak.
//+ 3 önce bir async login fonksiyonu ve axios isteği oluştrualım
//+ 4 const login = async () => { const data = await axios.post(`${process.env.baseURL}/auth/login`)}
//+ 5 url'i kullancağımız için ne yapmamız lazım env içerisinde kullanmamız lazım.
//+ 6 try-catch içerisine işlemlerimizi alıyoruz.
//+ 7 login isteğimizi dışarıda kullanmak istediğimiz için export ettik. Loginin içerisine gelecek olan veriler neler login.jsxteki veriler. O yüzden url'den sonra , koyup alacağımız veriyi yazıyoruz.
//+ 8 , den sonraki kısım ne yapıyor thunderdaki body gibi işlem yapar.
//+ 9 şimdi logini login.jsx'de çağıralım. ->

// const url = "https://17134.fullstack.clarusway.com/users/"

// - dışarıda kullanıcaz. içeride jsx elementleri kullanamadığımız için burayı bizim custom hook alanına çevirmemiz lazım. dispatch de bir hooktur custom hooktur. Nasıl yapıcaz bunu bir adı use ile başlamalı. 2- fonksiyon yazar gibi

const useAuthApiCall = () => {
  // - export olmaz return ile olur.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userInfo) => {
    // + 29 burada fetch start işlemini başlat. Ona göre bir dispatch yayınlıyoruz. Bunun için Slice'ı import ediyoruz.
    //+ EZBER:  30 dispatch yayınlamak için import yapmamız lazım.

    dispatch(fetchStart());
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userInfo
      );
      console.log(data.data);
      //+ 22 şimdi bu veriyi nasıl return edeceğiz?  Bunu nasıl yapmamız lazım global state ile buradaki veriyi global state'e aktarmak istiyoruz. Her yerde kullanabilelim. Simdi sliceımızı hazırlayalım. -> authSlice'a

      // + 13 başarılı mesajı ver. -> stocka yönlendir.
      toastSuccessNotify("login işlemi başarılı");
      //+30 tryın içinde data gelmiş demekki login başarılı o zaman başarılı dispatchini yayınlıyoruz.
      //+ 34 apiden gelen veriyi gönderiyoruz. apiden gelen veriyo loginSuccess'e pass geç. O veri nereye gidiyo useAuthSlice'a
      dispatch(loginSuccess(data));

      navigate("/stock");
    } catch (error) {
      console.log(error);
      toastErrorNotify("login işlemi başarısız oldu");
      // + 31 login başarısız mı oldu o zaman başarısız dispatch işlemini bana çağır. Şimdi işlemler nasıl değişecek ona bakalım. -> authSlice'a
      dispatch(fetchFail);
    }
  };

  const register = () => {};
  const logout = () => {};

  return { login, register, logout };
  // - bu şekilde export edilir.

  //+ 14 burada şöyle bir problemle karşılaşıyoruz. Bir react hookunu burada kullanabilmek için bizim bir custom hook oluşturmamız gerekiyor. Hooklar ya bir funcitonal component içerisinde ya da başka bir component içerisinde kulllanılabilir. Bunun dışında bir yerde kullanılamaz. Uygulamanın her yerinde çağırabileceğimiz bir fonksiyon oluşturuyoruz. Bizim jsx döndürme ihitiyacımız yok çözüm ne o zaman custom hook yapmak. Yani hem diğer hookları kullanabileceğiz hem de jsx ihtiyacımız olmayacak. Burada dispatch hookunu da kullanabilmemiz için hooka ihtiyacımız var.

  // + 15 custom hook yazımı?  -1) dosyanın adını use ile başlat.component olmadıkları için küçük harfle ve use ile başlar. -> useAuthApiCall
  //+ 16 2) bir react fonksyionu yazar gibi fonksyion yazıyoruz.
  //+ 17 3) login fonksiyonumuzu hookumuzun içerisine alıyoruz.
  //+ 18 4) burda fonksyionu hookun yapısı gereği nasıl export ediyoruz? return içerisinde aşağıdaki örnek kullanıma bakınız.

  // +
  //+ const useAuthCalls = () => {
  //+   const login = async (userInfo) => {
  //+     try {
  //+       const data = await axios.post(
  //+         `${process.env.REACT_APP_BASE_URL}/auth/login`,
  //+         userInfo
  //+       );
  //+       console.log(data.data);
  //+       13 başarılı mesajı ver. -> stocka yönlendir.
  //+       toastSuccessNotify("login işlemi başarılı");
  //+       navigate("/stock");
  //+     } catch (error) {
  //+       console.log(error);
  //+       toastErrorNotify("login işlemi başarısız oldu");
  //+     }
  //+   };
  //+ };

  //+ 19 logini hook içerisinde yazdığımız için artık import şeklimiz de değişti
  //+ 20 import ederken önce hook adını çağırıyoruz. import useAuthApiCall diyebiliriz ama export default olduğu için burada istediğimiz ismi ve verebiliriz.
  //+ 21 hookumuzu çağırdıktan sonra componentn içerisinde const {login} = useAuthCalls() diye de fonksiyonumuzu çağırabiliriz. Kullanım bu şekilde.
};

export default useAuthApiCall;

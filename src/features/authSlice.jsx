import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: "",
  loading: "",
  error: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    // - UI tarafında istek atmaya başlayınca çağıracağımız fonksiyonlar.
    fetchStart: () => {},
    loginSuccess: () => {},
    fetchFail: () => {},
  },
});

export const { fetchStart, loginSuccess, fetchFail } = authSlice.actions;
export default authSlice.reducer;

// Token (Belirteç/Jeton): Tek kullanımlık yaşam süresi olan hashlenmiş yada şifrelenmiş bir bilgi içeren metinlerdir.
// API ile iletişimde kullanılan token, kimlik doğrulaması için kullanılan bir tür anahtardır. Genellikle API isteklerini yetkilendirmek ve doğrulamak için kullanılır. Bu token, istemcinin kimliğini doğrulamak ve izin verilen işlemleri gerçekleştirmesine olanak tanır. Tokenlar genellikle güvenlik amacıyla kullanılır ve API istemcisine özgüdür. Başka bir deyişle, doğru token olmadan API ile iletişim kurmak mümkün olmaz. Bu tokenler, genellikle API sağlayıcısı tarafından sağlanır ve yetkilendirme işlemlerinde kullanılır.

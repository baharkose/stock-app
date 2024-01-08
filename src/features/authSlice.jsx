import { createSlice } from "@reduxjs/toolkit";

// + 23 Neye ihtiyacımız var? user,laoding, error, login olunca bize bir token verdi neden? bundan sonra her transferinde bana bu tokendan dönüş yap. Token olmazsa bize veri göndermiyor kim olduğumuzu bilmek istiyor. TOKEN: dijital kimlik olarak da düşünülebilir. İzinsiz erişimi önlemek ve güvenli veri erişimini sağlamak için kullanılır.

const initialState = {
  user: "",
  loading: false,
  error: false,
  token: "",
};

// + 24 şimdi reducer'a bakalım. Bizim global state'e gelecek olan verimiz api'den gelecek. Bunun için bizim ne yapmamız lazım. Ya asyncthunk ve ekstra reducers kullanacağız ya da workararound yöntemini kullanacağız.

//! WORKAROUND YÖNTEMİ ->

//+ 25 3 tane durum var apiye istek atıldığında işlemin, başlama durumu, başarılı olma durumu, başarızı olma durumu var tüm bu durumları tek tek kategorize edip onşarın durumlarını yazıp ve ona göre dispatch yaptığımızda thunka da ihitiyacımız kalmamış olur.

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // - UI tarafında istek atmaya başlayınca çağıracağımız fonksiyonlar.
    //+ UI da istek atınca işlem başlamış olsun -> başarılı ise başarılı olsun başarısız ise başarısız dispatchi yayınlansın.

    //+ 26 işlem başladı +32
    fetchStart: (state) => {
      state.loading = true;
    },

    //+ 27 işlem başarı
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      //+ 33 işlem başladığında payloadın içerisinden veri nasıl gelecek on abi bakalım. Şimdi istek attığımızda login successın bi payloadı olması lazım ki onu gönderelim. Peki bizim verilerimiz neler apiden gelen bilgiler. O yüzden bizim loginSuccess içerisinde datayı pass vermemiz lazım. -> useAuth hookuna

      //+ 34 + bu verilerin basamaklandırılmasını login işlemini thunderda görüntüleyerek bulabiliriz.
      state.user = payload.user.username;
      state.token = payload.token;
    },

    //+ 27 işlem başarısız.
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    registerSuccess: (state, { payload }) => {
      // - globale gidecekleri belirledik.
      state.loading = false;
      state.user = payload.data.username;
      // - burayı bi kontrol et.
      state.token = payload.token;
    },
    logoutSuccess: (state) => {
      state.user = "";
      state.loading = false;
      state.error = false;
      state.token = "";
    },
  },
});

// + 28 bunları ne yaptık? dışarıya export ettik. Şimdi istek nerde atılıyor UI tarafında hookun içerisinde o nedenle oraya gidip istek atma dispatchini yayınlıyoruz.
export const {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;

// Token (Belirteç/Jeton): Tek kullanımlık yaşam süresi olan hashlenmiş yada şifrelenmiş bir bilgi içeren metinlerdir.
// API ile iletişimde kullanılan token, kimlik doğrulaması için kullanılan bir tür anahtardır. Genellikle API isteklerini yetkilendirmek ve doğrulamak için kullanılır. Bu token, istemcinin kimliğini doğrulamak ve izin verilen işlemleri gerçekleştirmesine olanak tanır. Tokenlar genellikle güvenlik amacıyla kullanılır ve API istemcisine özgüdür. Başka bir deyişle, doğru token olmadan API ile iletişim kurmak mümkün olmaz. Bu tokenler, genellikle API sağlayıcısı tarafından sağlanır ve yetkilendirme işlemlerinde kullanılır.

import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { object, string, number, date, InferType } from "yup";
import useAuthApiCall from "../service/useAuthApiCall";

// - önce kendisini hookun
//- sonrada içieriisndeki logini çıakrız

//+ 19 logini hook içerisinde yazdığımız için artık import şeklimiz de değişti
//+ 20 import ederken önce hook adını çağırıyoruz. import useAuthApiCall diyebiliriz ama export default olduğu için burada istediğimiz ismi ve verebiliriz.
//+ 21 hookumuzu çağırdıktan sonra componentn içerisinde const {login} = useAuthCalls() diye de fonksiyonumuzu çağırabiliriz. Kullanım bu şekilde.

const Login = () => {
  const { login } = useAuthApiCall();
  // - 10 yupı import ettik yapın sayfasından burayı aldık. Object diye bir referans fonksyionu var alttakiler onun keyleri aslında
  let loginSchema = object({
    // - neden yazınca gelmedi otomatik erro burda bizim ayrıca bişey daha kollanmamız lazım onBlur. Muinin default hata mesajı kırmızı
    email: string().email().required("please enter a email"),
    password: string()
      .required("please enter a password")
      .min(8, "password must include at least 8 character")
      .max(16, "password can include at last 16 character")
      .matches(/\d+/, "password must include at least 1 number")
      .matches(/[a-z]/, "password en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "password en az bir büyük harf içermelidir")
      .matches(
        /[@$!%*?&]/,
        "password en az @$!%*?&'den birini içeren bir özel karakter içermelidir"
      ),

    // - regex nasıl yaparız?
  });
  //! Formik, React uygulamalarında form yönetimini kolaylaştırmak için tasarlanmış bir kütüphanedir. Formik, form state yönetimini, değerlerin izlenmesini, hata mesajlarının görüntülenmesini ve formun sunucuya gönderilmesini kolaylaştıran bir dizi özelliği sağlar. Aynı zamanda formun değerlerini takip etmek, formun durumunu kontrol etmek ve formların yapısını düzenlemek için kullanışlı yardımcı işlevler sunar.

  //? Yup ise form doğrulama kurallarını tanımlamak için kullanılan bir şema tabanlı doğrulama kütüphanesidir. Yup, formun alanlarını, gereklilikleri, veri türlerini, uzunluk sınırlamalarını, özel doğrulama işlevlerini vb. tanımlamak için kullanılır. Formun giriş değerlerini bu kurallara göre doğrular ve hata mesajları üretir.
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            // - harici şema için bunu tercih ettik
            onSubmit={(values, { resetForm, setSubmitting }) => {
              login(values);

              //+ 10 login bizden bir parametre bekliyor.  Nerede bu veriler values'un içerisindeki verileri direk oradan alabiliriz. Valuesun içersinde zaten başka bişey yok.

              //+ 11 bu işlemleri yaptıktan sonra login işlemleri bize gelicek ve bize bir token gelicek. Şimdi yönlendirme hata vs işlemlerimizi yapalım -> services'e

              // - TODO navigasyon - toast işlemleri - veri kaydetme(global alana) - form silme. actionsun içerisinde aslında bir dürü özellik var. ResetForm, formikHelper
              //! neden login işlemi post get değil?
              //* burada bir veri gönderme işlemi var. email ve password
              //- login için yazdığımız dosyayı çağırıyoruz.
              // login(values); useHook olduğu için çağırma değişti
              // - nerden alıcaz verileri valuesun içerisinden. içeride email ve password var.
              // - formiğin içinde kendi hazır tanımlı fonksiyonları var biz bunları kullanabiliyoruz.
              // resetForm();
              // setSubmitting(false);
              // - isSubmitting adında bir değişken var otomaik true false otomatik true submit olunca falsea kuruluyor. Bunu direk de kulanabiliriz
            }}
            // -3 üçüncü parametre values. Form elementi submit edildiğinde çalışacak olan alan. Burda bizim apiye bir login(post isteği atmamız lazım) Burada veri yollama isteği var.
          >
            {/* //- jsx alanında bir js aç bir callback bize form elementini döndürn 4- şimdi formu yazalım {() => ()} jsx alanı 
            // Formikten gelen

              // is identical to this...
              <form onReset={handleReset} onSubmit={handleSubmit} {...props} />
            
            */}
            {/* aşağıda kullancağımız yapıları ne yaptık çağırdık. formik yazmış kendisi biz sadece çağırdık. 
            //- formumuzu bir callback içerisinde return ediyoruz. 
            {() => <Form></Form>}
            
            //+ 1 login işlemleri birden fazla olacğı için derli toplu görünebilmesi için service adında bir klasör oluşturup orada login işlemlerimizi halledebileceğiz. Bunun için customHook oluşturmamız gerekli. Şimdi service klasörü altındaki autApi klasörümüze gidelim.
            
            */}
            {({ handleChange, values, touched, errors, handleBlur }) => (
              //- values bizim inital statelerimiz.
              // * burdaki error validasyon şemasına göre çalışıyor. errors bi obje içerisine email ve password almış. emailde error varsa errors.email vs. şeklinde yakalayabiliyoruz
              // - dikkat edilmesi gereken husus inputlarda name attirubetında kullanılan isimle intialValues da belirlenen state ismi eşleşmek zorunda. Formik in handlechange metodu name attribuetına göre doldurum yapıyor.
              <Form>
                <Box
                  // component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    autoComplete="true"
                    // - formikden gelecekler
                    value={values.email}
                    onChange={handleChange}
                    // - errora göre hata çıkarna dokununca değişmesi için touched
                    error={touched.email && Boolean(errors.email)}
                    // - touched emaile bak varsa true yaz. helper texte error basar.
                    helperText={errors.email}
                    // - errors.emaili bize bas. Şuan yup boş olduğu için hata gelmedi
                    //  -{/* error ve helperText propertyleri Textfield componentine ait propertyler. */}
                    //- mui textfield kullanmadığımzda hata mesajını göstermek için
                    //- {/* <span>{touched.username && errors.username}</span> */}
                    onBlur={handleBlur}
                    // - inputtan ayrıldığımızda hemen uyarı vermesi için
                    // helperText={touched.email && errors.email}
                    // helperText={touched.password && errors.password}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    autoComplete="true"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                    onBlur={handleBlur}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>
        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

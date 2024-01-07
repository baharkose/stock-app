import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { object, string, number, date, InferType } from "yup";

import TextField from "@mui/material/TextField";
import { TouchAppRounded } from "@mui/icons-material";
// - *1 login işlemleri için custom hookumuzu çağırdık
import useAuthApiCall from "../service/useAuthApiCall";

const Register = () => {
  // - *2 kullanacağımız fonksiyonu çağırdık.
  const { register } = useAuthApiCall();
  const navigate = useNavigate();

  let registerSchema = object({
    username: string().required("please enter a username"),
    firstName: string().required("please enter a first name"),
    lastName: string().required("please enter a last name"),
    email: string().email().required("please enter a mail"),
    password: string()
      .required("password must contain at least 8 character")
      .min(8, "the password should not be more than 16 characters long")
      .matches(/\d+/, "password must contain at least 1 number")
      .matches(/[a-z]/, "password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "password must contain at least one uppercase letter")
      .matches(
        /[@$!%*?&]/,
        "the password must include at least one special character from @$!%?&"
      ),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
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
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              firstName: "",
              firstName: "",
              lastName: "",
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              //- TODO navigasyon - toast işlemleri - veri kaydetme global alana - form silme

              register(values);
              resetForm();

              setSubmitting(false);
              // - ilk olarak custom hookumuzda register fonksiyonumuzu yazalım.

              // - hookumuzdan gelen registerı çağırdık. Register bir parametre bekliyor bu parametreler nerden gelecek values'ın içerisinden

              //- şimdi hooka gidip registerı düzenleyelim. öncesinde sliceımızı düzenleyelim.
            }}
          >
            {({ handleChange, values, touched, errors, handleBlur }) => (
              <Form>
                <Box
                  // component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="User Name"
                    name="username"
                    id="userName"
                    type="text"
                    variant="outlined"
                    // - formik
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={errors.username}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    type="text"
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    onBlur={handleBlur}
                  />

                  <TextField
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    type="text"
                    variant="outlined"
                    // - formik
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    // - formik
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    password
                    // - formik
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                    onBlur={handleBlur}
                  />
                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;

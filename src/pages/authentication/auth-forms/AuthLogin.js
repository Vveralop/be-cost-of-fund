import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MsalProvider,
  AuthenticatedTemplate,
  useMsal,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "../../../components/@extended/AnimateButton";
import { loginRequest } from "../../../authConfig";
// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { SignInButton } from "../../../components/authentication/button/signin";
import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";

// ============================|| LOGIN ||============================ //

// const AuthLogin = () => {
//   const { instance } = useMsal();

//   const [showPassword, setShowPassword] = React.useState(false);

//   let activeAccount;

//   if (instance) {
//       activeAccount = instance.getActiveAccount();
//   }

//   const handleLoginPopup = () => {
//     /**
//      * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page
//      * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
//      * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations
//      */
//     instance
//         .loginPopup({
//             ...loginRequest,
//             redirectUri: '/',
//         })
//         .catch((error) => console.log(error));
// };

// const handleLoginRedirect = () => {
//   instance.loginRedirect(loginRequest).catch((error) => console.log(error));
// };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//      <UnauthenticatedTemplate>
//       <Formik
//         initialValues={{
//           email: "hectordiaz.ingenieria@itau.cl",
//           password: "123456",
//           submit: null,
//         }}
//         validationSchema={Yup.object().shape({
//           email: Yup.string()
//             .email("Must be a valid email")
//             .max(255)
//             .required("Email is required"),
//           password: Yup.string().max(255).required("Password is required"),
//         })}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             setStatus({ success: false });
//             setSubmitting(false);
//           } catch (err) {
//             setStatus({ success: false });
//             setErrors({ submit: err.message });
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({
//           errors,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           isSubmitting,
//           touched,
//           values,
//         }) => (
//           // <form noValidate onSubmit={handleSubmit}>
//           <form noValidate onSubmit={handleLoginPopup}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <CustomTextField
//                     id="email-login"
//                     type="email"
//                     value={values.email}
//                     name="email"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     label="Ingresa tu credencial de banco"
//                     placeholder="Ingresa tu credencial de banco"
//                     fullWidth
//                     error={Boolean(touched.email && errors.email)}
//                   />
//                   {touched.email && errors.email && (
//                     <FormHelperText
//                       error
//                       id="standard-weight-helper-text-email-login"
//                     >
//                       {errors.email}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <CustomTextField
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="-password-login"
//                     type={showPassword ? "text" : "password"}
//                     value={values.password}
//                     name="password"
//                     label="Ingresa tu clave"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           size="large"
//                         >
//                           {showPassword ? (
//                             <EyeOutlined />
//                           ) : (
//                             <EyeInvisibleOutlined />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     placeholder="Ingresa tu clave"
//                   />
//                   {touched.password && errors.password && (
//                     <FormHelperText
//                       error
//                       id="standard-weight-helper-text-password-login"
//                     >
//                       {errors.password}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>

//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <SignInButton />
//                 </AnimateButton>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" color="#007AB7" textAlign="center">
//                   ¿Problemas con tu clave?
//                 </Typography>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     mr: 1,
//                     width: "100%",
//                     borderColor: "#EC7000",
//                     borderRadius: "8px",
//                     color: "#EC7000",
//                   }}
//                   // onClick={handleLogin}
//                 >
//                   <Typography variant="h6">
//                     ¿Eres nuevo en Itaú? Solicita tu acceso
//                   </Typography>
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//       </UnauthenticatedTemplate>
//     </>
//   );
// };
const AuthLogin = () => {
  const { instance } = useMsal();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    /**
     * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page
     * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
     * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations
     */
    instance
        .loginPopup({
            ...loginRequest,
            redirectUri: '/',
        })
        .catch((error) => console.log(error));
    // navigate("/");
  };

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <>
      {/* <UnauthenticatedTemplate> */}
      <div bg="primary" variant="dark" className="navbarStyle">
        <div className="collapse navbar-collapse justify-content-end">
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <AnimateButton>
                <SignInButton handleClick={handleLoginRedirect} />
              </AnimateButton>
            </Grid> */}
            <Grid item xs={12}>
              <AnimateButton>
                <SignInButton handleClick={handleLoginRedirect} />
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              {/* <button onClick={handleLoginRedirect}>
                  Sign in using Redirect
                </button> */}
            </Grid>
          </Grid>
        </div>
      </div>
      {/* </UnauthenticatedTemplate> */}
    </>
  );
};

export default AuthLogin;

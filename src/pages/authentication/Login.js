
// MUI
import { Grid, Stack, Typography } from "@mui/material";

// Project import
import AuthWrapper from "./AuthWrapper";
import LogoDark from "../../components/logoDark";
import LogoCustomDark from "../../components/logoCustomDark";
import AuthLogin from "./auth-forms/AuthLogin";

// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <LogoDark />
          <LogoCustomDark />
          <Typography variant="subtitleCard" textAlign="center" color="#546576">
            Te damos la bienvenida a la{" "}
            <Typography component="span">
              {" "}
              <span style={{ fontWeight: 700 }}>
                plataforma de análisis para tesorería
              </span>
            </Typography>
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;

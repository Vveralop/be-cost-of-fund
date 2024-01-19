import {useNavigate} from "react-router-dom";
// import { useMsal } from "@azure/msal-react";
import { Button, Typography } from "@mui/material";
// import { loginRequest } from "../../../authConfig";


export const SignInButton = ({handleClick}) => {
  // const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = () => {
    // instance.loginRedirect(loginRequest);
    navigate("/")
  };

  return (
    <Button
      variant="contained"
      sx={{
        mr: 1,
        width: "100%",
        backgroundColor: "#EC7000",
        borderRadius:"8px",
        color: "#FFFFFF",
      }}
      onClick={handleClick ? handleClick : handleLogin }
    >
      <Typography variant="h6">Iniciar sesión</Typography>
    </Button>
  );
};

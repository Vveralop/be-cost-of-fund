// material-ui
import { useTheme } from "@mui/material/styles";
import logoNameDark from "../../assets/images/logo-custom-name-dark.svg";
// ==============================|| LOGO SVG ||============================== //

const LogoCustom = () => {
  const theme = useTheme();

  return (
    <> <img src={logoNameDark} alt="itau-logo-name-dark" width="60" heigth="22" /></>
  );
};

export default LogoCustom;

// material-ui
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/images/itau-logo-blue.svg";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <>
      <img src={logo} alt="itau-logo-icon" width="60" heigth="60"/>
    </>
  );
};

export default Logo;

// material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import logoName from "../../assets/images/logo_custom_name.svg";
// ==============================|| LOGO SVG ||============================== //

const LogoCustom = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  let responsiveWidthSize = matchDownXL ? "40" : "60";
  let responsiveHeigthSize = matchDownXL ? "14" : "22";

  return (
    <> <img src={logoName} alt="itau-logo-name" width={responsiveWidthSize} heigth={responsiveHeigthSize} /></>
  );
};

export default LogoCustom;

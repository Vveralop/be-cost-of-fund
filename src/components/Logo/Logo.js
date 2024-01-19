// material-ui
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../../assets/images/itau_white_logo.svg";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  let responsiveSize = matchDownXL ? "40" : "60";

  return (
    <>
      <img
        src={logo}
        alt="itau-logo-icon"
        width={responsiveSize}
        heigth={responsiveSize}
      />
    </>
  );
};

export default Logo;

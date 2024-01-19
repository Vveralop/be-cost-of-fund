import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
// assets icons
import HomeIcon from "../../../../assets/images/home-icon.svg";
import ProductIcon from "../../../../assets/images/product-icon.svg";

const MenuIconGenerate = (IconRef) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  let responsiveIconSize = matchDownXL ? "24" : "32";

  switch (IconRef) {
    case "i_home":
      return (
        <img src={HomeIcon} alt="menu-right-arrow" width={ responsiveIconSize} heigth={ responsiveIconSize}  />
      );
      break;
    case "i_products":
      return (
        <img src={ProductIcon} alt="menu-right-arrow" width={ responsiveIconSize} heigth={ responsiveIconSize} />
      );
      break;

    default:
      return (
        <img src={HomeIcon} alt="menu-right-arrow" width={ responsiveIconSize} heigth={ responsiveIconSize} />
      );
      break;
  }
};

export default MenuIconGenerate;

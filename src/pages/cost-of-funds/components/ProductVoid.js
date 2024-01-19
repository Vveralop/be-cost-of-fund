import React from "react";
// assets
import InformationLogo from "../../../assets/images/main-information-logo.svg";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography,useMediaQuery } from "@mui/material";

const ProductVoid = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  let responsiveIconSize = matchDownXL ?  "80" : "104"

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #E5E5E5",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding:matchDownXL ? 12 : 16,
        height: matchDownXL ? "478px" : "770px",
      }}
    >
      <img src={InformationLogo} alt="exit-icon" width={responsiveIconSize} heigth={responsiveIconSize} />
      <Typography variant={matchDownXL ? "normalBold14" : "normalBold18"} color="#56504C">Elige un tipo de crédito</Typography>
      <Typography variant={matchDownXL ? "subtitle12" : "subtitle16"} color="#56504C">Así podrás iniciar tu recomendación de productos.</Typography>
    </div>
  );
};

export default ProductVoid;

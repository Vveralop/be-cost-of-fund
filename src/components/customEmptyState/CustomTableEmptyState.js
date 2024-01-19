import React from "react";
// assets
import NoRegistriesLogo from "../../assets/images/no-regitries.svg";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography,useMediaQuery } from "@mui/material";

const CustomTableEmptyState = () => {
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
        height: matchDownXL ? "178px" : "227px",
      }}
    >
      <img src={NoRegistriesLogo} alt="exit-icon" width={responsiveIconSize} heigth={responsiveIconSize} />
      <Typography variant={matchDownXL ? "normalBold16" : "normalBold18"} color="#56504C">Sin registros</Typography>
      <Typography variant={matchDownXL ? "subtitle12" : "subtitle16"} color="#56504C" sx={{textAlign:"center"}}><p>Descarga el archivo excel y llena las celdas de “fecha de inicio”, “fecha término” y “flujo capital”.<br/> Una vez llenadas, copia las 3 celdas y selecciona el boton “Pegar”.</p></Typography>
    </div>
  );
};

export default CustomTableEmptyState;

import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography,useMediaQuery } from "@mui/material";
import ErrorIcon from "../../assets/images/alert-icon-red.svg";
import WarningIcon from "../../assets/images/warning-icon.svg";

const CustomWarningAlert = ({ mainMessage, secondMessage, type="warning" }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  let responsiveIconSize = matchDownXL ?  "28" : "32"
  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        padding: matchDownXL ? "6px" : "12px",
        display: "flex",
        flexDirection: "row",
        backgroundColor: type === "warning" ? "#FCEBCB" : "#F6E1E1",
        borderRadius: "4px",
        borderLeft: `4px solid ${type === "warning" ? "#F1AE2F" :"#B71C1C"}`,
        // zIndex:3000
      }}
    >
      <div>
        <img src={ type === "warning" ? WarningIcon : ErrorIcon } alt="warning-icon" width={responsiveIconSize} heigth={responsiveIconSize} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant={matchDownXL ? "normalBold12" :"customTextButton"} color="#56504C">
          {mainMessage}
        </Typography>
        <Typography variant={matchDownXL ? "menuTitleText12" :"menuTitleText"} color="#56504C">
          {secondMessage}
        </Typography>
      </div>
    </div>
  );
};

export default CustomWarningAlert;

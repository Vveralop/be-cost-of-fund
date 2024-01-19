import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography, useMediaQuery } from "@mui/material";
import AddIcon from "../../../../assets/images/addIcon.svg";

const CustomUploadButton = ({ required }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  let responsiveIconSize = matchDownXL ? "32px" : "40px";
  return (
    <div
      style={{
        width: "100%",
        height: matchDownXL ? "60px" : "80px",
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `${required ? "2px" : "1px"} solid ${
          required ? "#B71C1C" : "#EFE9E5"
        }`,
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <div>
        <img
          src={AddIcon}
          alt="add-icon"
          width={responsiveIconSize}
          heigth={responsiveIconSize}
        />
      </div>
      <div style={{ paddingBottom: "6px", paddingLeft: "8px" }}>
        <Typography
          variant={matchDownXL ? "normalBold12" : "normalBold14"}
          color="#56504C"
        >
          Perfil de pagos
        </Typography>
      </div>
    </div>
  );
};

export default CustomUploadButton;

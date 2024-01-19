import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography,useMediaQuery } from "@mui/material";

const UnderlinedCustomButtom = ({
  title,
  handler,
  flag,
  mainIcon,
  secondaryIcon,
}) => {

  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));


  return (
    <div
      style={{
        height: matchDownXL ? "33px" : "48px",
        margin: matchDownXL ? "0px 4px" : "0px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={handler}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          borderBottom: "2px solid #007AB7",
        }}
      >
        <div>
          <Typography variant={matchDownXL ? "textButtonSmall" : "textButton"} color="#007AB7">
            {title}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: matchDownXL ? "18px" : "24px",
            height: matchDownXL ? "18px" : "24px",
            alignItems: "flex-end",
            padding: "2px",
          }}
        >
          {flag ? (
            <img
              src={flag === true ? secondaryIcon : mainIcon}
              alt="exit-icon"
              style={{
                width: matchDownXL ? "14px" : "16px",
                height: matchDownXL ? "16px" :"18px",
              }}
            />
          ) : (
            <img src={mainIcon} alt="exit-icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnderlinedCustomButtom;

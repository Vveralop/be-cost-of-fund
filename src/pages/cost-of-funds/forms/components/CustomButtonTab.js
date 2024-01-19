import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const CustomButtonTab = ({ children, active, handleClick }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <div
      onClick={handleClick}
      style={{
        borderBottom: `4px solid ${active ? "#EC7000" : "#EFE9E5"}`, // Disabled: #EFE9E5
        padding: matchDownXL ? "2px" : "6px",
        minHeight: "48px",
        width: "50%",
        cursor: "pointer",
        marginRight: "2px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default CustomButtonTab;

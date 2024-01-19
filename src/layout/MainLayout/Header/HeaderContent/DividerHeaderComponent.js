import React from "react";
// Material-ui
import { Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DividerHeaderComponent = () =>{
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
    return (
        <Divider
        orientation="vertical"
        sx={{ height: 24, width: "2px", backgroundColor: "#3B3F49" , marginLeft:matchDownXL ? "16px" : "24px",}}
      />
    )
};

export default DividerHeaderComponent;
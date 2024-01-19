import React from "react";
import { format } from 'date-fns'
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography, useMediaQuery } from "@mui/material";

const DateHeaderComponent = () => {
  const currentDate = new Date();
  const currDateFormatted = format(currentDate, "MM/dd/yyyy HH:mm")
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  const divStyles = {
    display: "flex",
    width: matchDownXL ? "180px": "226px",
    padding: matchDownXL ? "16px": "24px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div style={divStyles}>
      <div
        style={{
          display: "flex",
          width: matchDownXL ? "152px" : "178px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant={matchDownXL ? "normal12": "normal16"} color="#000512">
        {`${currDateFormatted} horas`}
        </Typography>
      </div>
    </div>
  );
};

export default DateHeaderComponent;

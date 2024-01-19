import React from "react";
import PropTypes from "prop-types";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery,Typography } from "@mui/material";

const CustomTableRightCellHead = ({ width, fontWeight, title }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: width,
        backgroundColor: "#E5E8EF",
        color: "#231D19",
        borderTopRightRadius: 10,
        borderBottom: "1px solid #D9D3CF",
        padding: matchDownXL ? 12 : 16,
      }}
    >
      <Typography variant={matchDownXL ? "normalBold12" : "normalBold14"}>
        {title}
      </Typography>
    </div>
  );
};

CustomTableRightCellHead.propTypes = {
  width: PropTypes.string.isRequired,
  fontWeight: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default CustomTableRightCellHead;

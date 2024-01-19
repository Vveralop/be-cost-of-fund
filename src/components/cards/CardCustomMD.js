import React from "react";
import PropTypes from "prop-types";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Card, Typography, useMediaQuery } from "@mui/material";

const CardCustomMD = ({
  height = 220,
  url,
  imgWidth = 104,
  imgHeight = 104,
  title,
  subtitle,
}) => {

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));


  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <div
        style={{
          minHeight: height,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding:"16px",
          ...(matchDownLG && {minHeight:150}),
          ...(matchDownMD && {minHeight:130}),
          ...(matchDownSM && {minHeight:110})
        }}
      >
        <div>
          <img
            src={url}
            alt="card-md-icon"
            width={imgWidth}
            heigth={imgHeight}
          />
        </div>
        <div>
          <Typography variant="titleCard" color="#56504C">
            {title}
          </Typography>
        </div>
        <div>
          <Typography variant="subTitleDialog" color="#56504C">
            {subtitle}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

CardCustomMD.propTypes = {
  height: PropTypes.number,
  url: PropTypes.string.isRequired,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CardCustomMD;

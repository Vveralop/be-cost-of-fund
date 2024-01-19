import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";

const CardCustomXL = ({
  height = 354,
  url,
  imgWidth = 104,
  imgHeight = 104,
  title,
  subtitle,
}) => {
  return (
    <Card
    sx={{
      width: "100%",
    }}
  >
    <div
      style={{
        height: height,
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <div>
        <img
          src={url}
          alt="exit-icon"
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

CardCustomXL.propTypes = {
  height: PropTypes.number,
  url: PropTypes.string.isRequired,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CardCustomXL;

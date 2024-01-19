import React from "react";
import PropTypes from "prop-types";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Card, CardMedia,useMediaQuery } from "@mui/material";
//

const CardBannerXL = ({ title, url, height = 290 }) => {

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Card>
      <CardMedia component="img" sx={{ 
        minHeight:290,
        backgroundPositionX:"x-start",
        ...(matchDownLG && {minHeight:160}),
        ...(matchDownMD && {minHeight:150}),
        ...(matchDownSM && {display:"none"})
        }} image={url} title={title} />
    </Card>
  );
};

CardBannerXL.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  height: PropTypes.number,
  rowsPerPage: PropTypes.number.isRequired,
};

export default CardBannerXL;


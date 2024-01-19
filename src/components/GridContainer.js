import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Breadcrumb from "../layout/breadcrumb/Breadcrumb";

const GridContainer = ({ BCItems, title, subtitle, to, children }) => (
  <>
    <Breadcrumb title={title} subtitle={subtitle} items={BCItems} />
    <Grid container spacing={1} sx={{ mt: 2, px: 0 }}>
      {children}
    </Grid>
  </>
);

GridContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default GridContainer;

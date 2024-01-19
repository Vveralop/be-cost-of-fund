import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Box,useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";


const Breadcrumb = ({ subtitle, items, title, homeUrl = "/", children }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  return (
  <Grid
    container
    sx={{
      p: matchDownXL ? "10px": "15px",
    }}
  >
    <Grid item xs={12} sm={6} lg={8}>
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link
                    underline="none"
                    color="inherit"
                    component={NavLink}
                    to={item.to}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>{item.title}</>
                )}
              </div>
            ))
          : ""}
      </Breadcrumbs> */}
      {/* <OneBreadcrumb homeUrl={homeUrl} items={items} /> */}
      <div style={{ marginTop:matchDownXL ? 5 : 9 }}>
        <Typography variant={matchDownXL ? "normalBold20" : "normalBold28"} color="#231D19">
          {title}
        </Typography>
      </div>
      <div style={{ marginTop:matchDownXL ? 5 : 9 }}>
        <Typography variant={matchDownXL ? "normal14" : "normal18"} color="#231D19">
          {subtitle}
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: "none", md: "block", lg: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Grid>
  </Grid>
)};

Breadcrumb.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Breadcrumb;

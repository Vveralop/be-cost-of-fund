import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const PageContainer = ({ title, description, children }) => {
  const theme = useTheme();
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    // Update screen size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Setting initial screen size
    handleResize();

    // Adding change screen size listener
    window.addEventListener("resize", handleResize);

    // Cleaning listener
    return () => window.removeEventListener("resize", handleResize);
  }, [window]);

  return (
    <div
      style={{
        // backgroundColor: "#CCCCCC",
        width: "100%",
        height: `calc(100vh - 100px)`,
      }}
    >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div style={{ padding:matchDownXL ? "10px" : "20px" }}>{children}</div>
    </div>
  );
};

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;

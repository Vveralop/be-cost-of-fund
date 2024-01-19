import PropTypes from "prop-types";

// Material-ui
import { useTheme } from "@mui/material/styles";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";

// Project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";


// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  // common header
  const mainHeader = (
    <Toolbar>
     {/* In case that you require a menu icon button, adding code here below */}
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: 'none',
      backgroundColor:"#FFFFFF",
      boxShadow: theme.customShadows.z1
    },
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;

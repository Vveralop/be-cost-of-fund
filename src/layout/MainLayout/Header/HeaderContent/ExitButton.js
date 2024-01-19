import React , {useState}from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import ExitIcon from "../../../../assets/images/exit-icon.svg";
// Material-ui
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import { loginRequest } from "../../../../authConfig";

const ExitButton = ({ textButton, goTo }) => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [ isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  let responsiveIconSize = matchDownXL ? "16" : "19";

  const divStyles = {
    display: "flex",
    width: matchDownXL ? "127px" : "147px",
    marginLeft: matchDownXL ? 14 : 24,
    padding:4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: isHovered ? "#F4F6F8" :"#FFFFFF",
    borderRadiur:"2px"
    
  };

  const handleClick = () => {
    // Some operation...
    instance.logoutRedirect();
    // navigate(goTo)
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={divStyles} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        style={{
          width: "160px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={matchDownXL ? "normal12" : "normal14"}
          color="#000512"
        >
          {textButton}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={ExitIcon} alt="exit-icon" width={responsiveIconSize} heigth={responsiveIconSize} />
      </div>
    </div>
  );
};

ExitButton.propTypes = {
  buttonText: PropTypes.string,
  goTo: PropTypes.string,
  // handleClick:PropTypes.func.isRequired
};

export default ExitButton;

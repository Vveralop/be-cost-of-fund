import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

import LeftMenuArrow from "../../../../../assets/images/menu-arrow-left-icon.svg";
import RightMenuArrow from "../../../../../assets/images/menu-arrow-right-icon.svg";
import MiniDrawerIconContainer from "../../Components/MiniDrawerIconContainer";

const CollapsableButton = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  let responsiveIconSize = matchDownXL ? "12" : "16";

  return (
    <React.Fragment key={"open-close-button"}>
      <ListItem
        sx={{
          p: matchDownXL ? "14px" : "16px",
          color: "white",
          cursor: "pointer",
          //   backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
          "&:hover": {
            backgroundColor: "#154166",
          },
          height: matchDownXL ? 50 : 65
        }}
        onClick={handleDrawerToggle}
      >
        {open ? (
          <>
            <ListItemIcon sx={{p:0}}>
              <img
                src={LeftMenuArrow}
                alt="menu-right-arrow"
                width={responsiveIconSize}
                heigth={responsiveIconSize}
              />
            </ListItemIcon>
            <ListItemText sx={{p:0}}>
              <Typography
                variant={matchDownXL ? "normal12" : "normal14"}
                color="#BFC1C4"
              >
                {"Ocultar menú"}
              </Typography>
            </ListItemText>
          </>
        ) : (
          <MiniDrawerIconContainer>
            <img
              src={RightMenuArrow}
              alt="menu-right-arrow"
              width={responsiveIconSize}
              heigth={responsiveIconSize}
            />
          </MiniDrawerIconContainer>
        )}
      </ListItem>
    </React.Fragment>
  );
};

export default CollapsableButton;

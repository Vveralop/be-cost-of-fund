import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

// assets icons
import MenuUpArrowIcon from "../../../../../assets/images/menu-arrow-up-icon.svg";
import MenuDownArrowIcon from "../../../../../assets/images/menu-arrow-down-icon.svg";

// Material-ui
import { useTheme } from "@mui/material/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Project import
import NavItem from "./NavItem";
import MenuIconGenerate from "../../Components/MenuIconGenerate";
import MiniDrawerIconContainer from "../../Components/MiniDrawerIconContainer";

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const selectMenu = (state) => state.menu;

const NavGroup = ({ item, isOpen }) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const pathStayCurrent = pathname.split("/")[1];
  const menu = useSelector(selectMenu);
  const { drawerOpen } = menu;

  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  let responsiveIconSize = matchDownXL ? "12" : "16";

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const navCollapse = item.children?.map((menuItem, index) => {
    const Icon = menuItem.icon;
    const menuItemSlicePath = menuItem.url.slice(1);

    switch (menuItem.type) {
      case "collapse":
        return (
          <React.Fragment key={menuItem.title}>
            {isOpen ? (
              <>
                <ListItem
                  button
                  component="li"
                  onClick={() => handleClick(index)}
                  selected={pathWithoutLastPart === menuItem.href}
                  sx={{
                    p: matchDownXL ? "14px" : "16px",
                    height: matchDownXL ? 50 : 65,
                    color: "white",
                    borderTop: "0.25px solid #000512",
                    borderBottom: "0.25px solid #000512",
                    "&:hover": {
                      backgroundColor: "#154166",
                    },
                    ...(pathWithoutLastPart === menuItem.href && {
                      backgroundColor: "#154166",
                    }),
                    ...(pathStayCurrent === menuItemSlicePath && {
                      borderLeft: "4px solid #FF5500",
                    }),
                  }}
                >
                  <ListItemIcon>{MenuIconGenerate(Icon)}</ListItemIcon>
                  &nbsp;
                  <ListItemText>
                    {
                      <Typography
                      variant={matchDownXL ? "normal12" : "normal14"}
                        color="#FFFFFF"
                        sx={{ marginLeft: "8px" }}
                      >
                        {menuItem.title}
                      </Typography>
                    }
                  </ListItemText>
                  {index === open || pathWithoutLastPart === menuItem.href ? (
                    <img
                      src={MenuUpArrowIcon}
                      alt="menu-up-arrow"
                      width={responsiveIconSize}
                      heigth={responsiveIconSize}
                    />
                  ) : (
                    <img
                      src={MenuDownArrowIcon}
                      alt="menu-down-arrow"
                      width={responsiveIconSize}
                      heigth={responsiveIconSize}
                    />
                  )}
                </ListItem>
              </>
            ) : (
              <ListItem
                button
                component={NavLink}
                to={menuItem.url}
                onClick={() => handleClick(index)}
                selected={pathWithoutLastPart === menuItem.url}
                sx={{
                  p: matchDownXL ? "14px" : "16px",
                  height: matchDownXL ? 50 : 65,
                  color: "white",
                  borderTop: "0.25px solid #000512",
                  borderBottom: "0.25px solid #000512",
                  "&:hover": {
                    backgroundColor: "#154166",
                  },
                  ...(pathStayCurrent === menuItemSlicePath && {
                    backgroundColor: "#154166",
                  }),
                  ...(pathStayCurrent === menuItemSlicePath && {
                    borderLeft: "4px solid #FF5500",
                  }),
                }}
              >
                <MiniDrawerIconContainer>
                  {MenuIconGenerate(Icon)}
                </MiniDrawerIconContainer>
              </ListItem>
            )}
            {isOpen ? (
              <Collapse in={index === open} timeout="auto" unmountOnExit>
                <List component="li" disablePadding>
                  {menuItem.children.map((child) => {
                    return (
                      <ListItem
                        key={child.title}
                        button
                        component={NavLink}
                        to={child.href}
                        // onClick={}
                        selected={pathDirect === child.href}
                        sx={{
                          p: matchDownXL ? "14px" : "16px",
                          height: matchDownXL ? 50 : 65,
                          color: "white",
                          borderTop: "0.25px solid #000512",
                          borderBottom: "0.25px solid #000512",
                          backgroundColor: "#001840", // Default unselected child item
                          "&:hover": {
                            backgroundColor: "#154166",
                          },
                          ...(pathWithoutLastPart === menuItem.href && {
                            backgroundColor: "#154166",
                          }),
                          ...(pathStayCurrent === menuItemSlicePath && {
                            borderLeft: "4px solid #FF5500",
                          }),
                        }}
                      >
                        <ListItemText>
                          {
                            <Typography variant={matchDownXL ? "normal12" : "normal14"} color="#FFFFFF">
                              {child.title}
                            </Typography>
                          }
                        </ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            ) : null}
          </React.Fragment>
        );
      case "item":
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography
            key={menuItem.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Comming soon!
          </Typography>
        );
    }
  });

  return (
    <List sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;

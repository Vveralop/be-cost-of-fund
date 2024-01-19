import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { NavLink, useNavigate,useLocation } from "react-router-dom";
// Material-ui
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// Project import
import NavGroup from "./NavGroup";
import menuItem from "../../../../../menu-items";
import MenuIconGenerate from "../../Components/MenuIconGenerate";
import MiniDrawerIconContainer from "../../Components/MiniDrawerIconContainer";
import { getAccesModules } from "../../../../../config/api/services";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({ open }) => {
  const { pathname } = useLocation();
  const [menuModules, setMenuModules] = useState([]);
  const navigate = useNavigate();
  const { instance } = useMsal();
  let pathWithoutLastPart =
    pathname === "/" ? "/" : pathname.slice(0, pathname.lastIndexOf("/"));

  useEffect(() => {
    gettingMenuitems();
  }, []);

  const gettingMenuitems = async () => {
    try {
      let result = await getAccesModules();
      console.log(result);
      
      if (result.statusCode === 401) {
        instance.logoutRedirect();
        return
        // instance.loginRedirect(loginRequest);
      }
      result = result.data;
      
      console.log("result_get_menu_items", result);
      console.log("menu_items", menuItem.items);
      let menuItems = menuItem.items;
      let childrens = [];
      result.forEach((el) => {
        let idx = menuItems[0].children.findIndex((item) => item.id === el.id);
        // console.log("idx",idx)
        if (idx >= 0) {
          const childModules = menuItems[0].children;
          // console.log(childModules)

          // console.log(el.children)
          el.children.forEach((path) => {
            let childIndex = childModules[0].children.findIndex((item) => {
              // console.log(item.href)
              // console.log(path.href)
              return item.href === path.href;
            });
            // console.log(childIndex)
            if (childIndex >= 0) {
              childrens.push(childModules[0].children[childIndex]);
            }
          });
        }
      });

      // console.log(childrens);
      // console.log(menuItems);

      menuItems[0].children[0].children = childrens;
      const modules = menuItems;
      console.log(modules);
      setMenuModules(modules);
    } catch (error) {
      console.log("error_get_menu_items", error);
      // Sending user to login session.
      if(error?.statusCode === 401){
        instance.logoutRedirect();
      }
    }
  };
  // console.log("menuModules",menuModules)
  // const navGroups = menuItem.items.map((item) => {
  const navGroups = menuModules.map((item) => {
    const Icon = item.icon;

    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} isOpen={open} />;
      default:
        return (
          <React.Fragment key={item.title}>
            {open ? (
              <>
                <ListItem
                  button
                  component={NavLink}
                  to={item.href}
                  selected={pathWithoutLastPart === item.href}
                  sx={{
                    p: "16px",
                    color: "white",
                    borderTop: "0.5px solid #000512",
                    borderBottom: "0.25px solid #000512",
                    "&:hover": {
                      backgroundColor: "#154166",
                    },
                    ...(pathWithoutLastPart === item.href && {
                      backgroundColor: "#154166",
                    }),
                    ...(pathWithoutLastPart === item.href && {
                      borderLeft: "4px solid #FF5500",
                    }),
                  }}
                >
                  <ListItemIcon>{MenuIconGenerate(Icon)}</ListItemIcon>

                  <ListItemText>
                    <Typography
                      variant="menuTitleText"
                      color="#FFFFFF"
                      sx={{ marginLeft: "8px" }}
                    >
                      {item.title}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </>
            ) : (
              <ListItem
                button
                component={NavLink}
                to={item.href}
                selected={pathWithoutLastPart === item.href}
                sx={{
                  p: "16px",
                  color: "white",
                  borderTop: "0.25px solid #000512",
                  borderBottom: "0.25px solid #000512",
                  "&:hover": {
                    backgroundColor: "#154166",
                  },
                  ...(pathWithoutLastPart === item.href && {
                    backgroundColor: "#154166",
                  }),
                  ...(pathWithoutLastPart === item.href && {
                    borderLeft: "4px solid #FF5500",
                  }),
                }}
              >
                <MiniDrawerIconContainer>
                  {MenuIconGenerate(Icon)}
                </MiniDrawerIconContainer>
              </ListItem>
            )}
          </React.Fragment>
        );
    }
  });

  return <Box sx={{ pt: 0 }}>{navGroups}</Box>;
};

export default Navigation;

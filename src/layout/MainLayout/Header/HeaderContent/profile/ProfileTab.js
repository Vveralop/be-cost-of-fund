import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// assets
import {
  EditOutlined,
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const textColor = "commercial.primary";
  const bgItemSelected = "commercial.terciary";
  const iconSelectedColor = "commercial.secondary";

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        "& .MuiListItemIcon-root": {
          minWidth: 32,
          color: theme.palette.orange[500],
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
        sx={{
          zIndex: 1201,
          "&:hover": {
            // bgcolor: "primary.lighter",
            bgcolor: bgItemSelected,
          },
          "&.Mui-selected": {
            // bgcolor: "primary.lighter",
            bgcolor: bgItemSelected,
            borderRight: `2px solid ${theme.palette.commercial.secondary}`,
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              //   bgcolor: "primary.lighter",
              bgcolor: bgItemSelected,
            },
          },
        }}
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Editar Perfil" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
        sx={{
          zIndex: 1201,
          "&:hover": {
            // bgcolor: "primary.lighter",
            bgcolor: bgItemSelected,
          },
          "&.Mui-selected": {
            // bgcolor: "primary.lighter",
            bgcolor: bgItemSelected,
            borderRight: `2px solid ${theme.palette.commercial.secondary}`,
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              //   bgcolor: "primary.lighter",
              bgcolor: bgItemSelected,
            },
          },
        }}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="Ver Perfil" />
      </ListItemButton>

      {/* <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon>
        <ListItemText primary="Billing" />
      </ListItemButton> */}
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={handleLogout}
        sx={{
          zIndex: 1201,
          "&:hover": {
            // bgcolor: "primary.lighter",
            bgcolor: bgItemSelected,
          },
          "&.Mui-selected": {
            // bgcolor: "primary.lighter",
            bgcolor: bgItemSelected,
            borderRight: `2px solid ${theme.palette.commercial.secondary}`,
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              //   bgcolor: "primary.lighter",
              bgcolor: bgItemSelected,
            },
          },
        }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func,
};

export default ProfileTab;

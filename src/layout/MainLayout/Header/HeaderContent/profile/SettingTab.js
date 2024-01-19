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
  CommentOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
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
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Contáctanos" />
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
        <ListItemText primary="configuración" />
      </ListItemButton>
      {/* <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton> */}
      {/* <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton> */}
      {/* <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItemButton> */}
    </List>
  );
};

export default SettingTab;

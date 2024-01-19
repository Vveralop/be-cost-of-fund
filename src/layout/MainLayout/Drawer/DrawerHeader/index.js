import PropTypes from "prop-types";

// Material-ui
import { useTheme } from "@mui/material/styles";
import { Stack, Chip, Typography } from "@mui/material";

// Project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "../../../../components/Logo";
import LogoCustom from "../../../../components/LogoCustom";

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="column" sx={{ mb:"50px", mt:"50px"}} spacing={1} justifyContent="center" alignItems="center">
        <Logo />
        <LogoCustom />
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;

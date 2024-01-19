import PropTypes from "prop-types";

// Material-ui
import { Box } from "@mui/material";

// project import
import MainCard from "../../components/MainCard";

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 255, lg: 352 },
      margin: { xs: 2.5, md: 3 },
      "& > *": {
        flexGrow: 1,
        flexBasis: "50%",
      },
    }}
    content={false}
    {...other}
    border={false}
    boxShadow
    shadow={(theme) => theme.customShadows.z1}
  >
    <Box sx={{ p: { xs: 2, sm: 2, md: 2, xl: 2 } }}>{children}</Box>
  </MainCard>
);

AuthCard.propTypes = {
  children: PropTypes.node,
};

export default AuthCard;

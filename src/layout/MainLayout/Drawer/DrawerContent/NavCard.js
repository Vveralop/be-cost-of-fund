// Material-ui
import { Button, CardMedia, Link, Stack, Typography } from "@mui/material";

// Project import
import MainCard from "../../../../components/MainCard";

// assets
import avatar from "../../../../assets/images/logo-itau-bank.png";
import AnimateButton from "../../../../components/@extended/AnimateButton";
import Logo from "../../../../components/Logo/Logo";

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => (
  <MainCard sx={{ bgcolor: "purple.50", m: 2 }}>
    <Stack alignItems="center" spacing={2}>
      <Stack alignItems="center">
        <CardMedia component="img" image={avatar} sx={{ width: 57, heigth:88 }} />
        {/* <Typography variant="h5">U-FaceId</Typography> */}
        <Typography variant="h6" color="secondary">
          Conoce más
        </Typography>
      </Stack>
      <AnimateButton>
        <Button
          component={Link}
          target="_blank"
          href="https://ww2.itau.cl/personas"
          variant="contained"
          color="success"
          size="small"
        >
          Ver
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;

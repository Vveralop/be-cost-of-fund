// Material-ui
import {
  useMediaQuery,
  Container,
  Link,
  Typography,
  Stack,
} from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography variant="subtitle2" color="secondary" component="span">
          &copy; React Platform By&nbsp;
          <Typography
            component={Link}
            variant="subtitle2"
            href="https://github.com/hadmarcano/pm-backoffice-upgrade-kit"
            target="_blank"
            underline="hover"
          >
            @hadmarcano
          </Typography>
        </Typography>

        <Stack
          direction={matchDownSM ? "column" : "row"}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://www.linkedin.com/in/hector-adolfo-diaz-marcano-ab0a27aa/"
            target="_blank"
            underline="hover"
          >
            @hadmarcano Templates
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            // component={Link}
            // href="https://*******/.com"
            target="_blank"
            underline="hover"
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            // component={Link}
            // href="https://*******/.com"
            target="_blank"
            underline="hover"
          >
            Support
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;

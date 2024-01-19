import React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Button, Typography, useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({ textButton, valid, handleClick, loading }) => {

  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Button
      variant="contained"
      size={matchDownXL ? "small":"large"}
      disabled={!valid}
      sx={{
        mr: 1,
        width: "100%",
        height: matchDownXL ? "33px": "100%",
        ...(valid === false
          ? {
              backgroundColor: "#D9D3CF",
              color: "#56504C",
            }
          : { backgroundColor: "#003767" }),
      }}
      onClick={handleClick}
    >
      {loading === true && (
        <Stack sx={{ color: "grey.500", marginRight:"8px" }} spacing={2} direction="row">
          <CircularProgress color="secondary" size={16}/>
        </Stack>
      )}
      <Typography variant={matchDownXL ? "textButtonSmall" : "textButton"}>{textButton}</Typography>
    </Button>
  );
};

export default CustomButton;

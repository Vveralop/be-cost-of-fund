// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    "&.Mui-disabled": {
      backgroundColor: "#D9D3CF",
      color: "#56504C",
    },
    "&:hover": {
      backgroundColor: "#154166",
    },
  };

  const outlinedStyle = {
    "&.MuiButton-outlined": {
      backgroundColor: "#FFFFFF",
      color: "#EC7000",
      border: "1px solid #EC7000"
    },
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#FFFFFF",
      border: "1px solid #EC7000"
    },
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
        },
        contained: {
          ...disabledStyle,
        },
        outlined: {
          ...outlinedStyle,
        },
      },
    },
  };
}

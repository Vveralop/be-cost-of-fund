// Material-ui
// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.grey[600],
          color: "#231D19",
          fontFamily: "Roboto",
          fontSize: "14px",
          [theme.breakpoints.down("xl")]: {
            fontSize: "12px",
          },
          // fontWeight: 700,
        },
        outlined: {
          lineHeight: "1em",
          "&.MuiInputLabel-sizeSmall": {
            lineHeight: "1em",
          },
          "&.MuiInputLabel-root": {
            color: "#56504C",
            fontFamily: "Roboto",
            fontSize: "14px",
            [theme.breakpoints.down("xl")]: {
              fontSize: "12px",
            },
            top: 5,
            [theme.breakpoints.down("xl")]: {
              top: 1
            },
            // fontWeight: 700,
          },
          "&.MuiInputLabel-shrink": {
            background: theme.palette.background.paper,
            padding: "0 8px",
            marginLeft: -6,
            lineHeight: "1.4375em",
            fontWeight: 700,
            color: "#231D19",
            top: 2,
          },
        },
      },
    },
  };
}

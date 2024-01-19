// material-ui
import { alpha } from "@mui/material/styles";
import SelectArrowUp from "../../assets/images/select-arrow-up-icon.svg";

// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "10.5px 14px 10.5px 12px",
          [theme.breakpoints.down("xl")]: {
            padding: "8.5px 12px 8.5px 10px",
          },
          // padding: "8.5px 12px 8.5px 10px",
        },
        notchedOutline: {
          borderColor: "#56504C",
          // borderColor: theme.palette.grey[300],
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EC7000",
            // borderColor: theme.palette.primary.light,
          },
          "&.Mui-focused": {
            // boxShadow: `0 0 0 2px ${alpha("#EC7000", 0.2)}`,
            // boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid #EC7000`,
              // border: `1px solid ${theme.palette.primary.light}`,
            },
          },
          "&.Mui-error": {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.light,
            },
            "&.Mui-focused": {
              // boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
              "& .MuiOutlinedInput-notchedOutline": {
                border: `1px solid ${theme.palette.error.light}`,
              },
            },
          },
          // "&.Mui-disabled": {
          //   color: "#56504C",
          //   opacity: 1,
          //   "& .MuiOutlinedInput-input": {
          //     color: "#56504C",
          //   },
          // },
        },
        inputSizeSmall: {
          padding: "12px 8px 7.5px 12px",
          // padding: "7.5px 8px 7.5px 12px",
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },
  };
}

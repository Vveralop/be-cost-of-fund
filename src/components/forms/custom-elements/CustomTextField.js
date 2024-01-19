import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const CustomTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    "& .MuiInputBase-input-MuiOutlinedInput-input": {
      [theme.breakpoints.down("xl")]: {
        fontSize: "10px",
      },
    },
    "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
      color: "#767e89",
      opacity: "1",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${
        theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "#dee3e9"
      }`,
      height: "48px",
      [theme.breakpoints.down("xl")]: {
        height: "38px",
        fontSize: "12px",
      },
    },
    "& .MuiInputBase-multiline": {
      height: "auto",
      fontSize: "12px",
      [theme.breakpoints.down("xl")]: {
        height: "auto",
        fontSize: "12px",
      },
    },
    // variant:outlined - Change font color when is disabled
    "& .MuiOutlinedInput-input.Mui-disabled": {
      backgroundColor: `${
        theme.palette.mode === "dark" ? "#FFFFFF" : "#f8ff9fb"
      }`,
      color: "#56504C",
      "-webkit-text-fill-color": "#56504C",
    },
    // variant:standard - Change font color when is disabled
    "& .MuiInputBase-input.Mui-disabled": {
      backgroundColor: `${
        theme.palette.mode === "dark" ? "#FFFFFF" : "#f8ff9fb"
      }`,
      color: "#56504C",
      "-webkit-text-fill-color": "#56504C",
    },
    "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
      color: "#767e89",
      opacity: "1",
    },
    // hide the up and down arrows of the input field
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&.MuiFormLabel-root": {
      color: "#231D19",
      fontSize: "14px",
      [theme.breakpoints.down("xl")]: {
        fontSize: "12px",
      },
      fontWeight: 700,
    },
  })
);

export default CustomTextField;

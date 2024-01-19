import React from "react";
import chipCloseIcon from "../../../../assets/images/chipCloseIcon.svg";
import { Typography } from "@mui/material";

const CustomChip = ({ label, handleClick }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #003399",
        borderRadius: "62px",
        padding: "8px",
        marginRight: "8px",
        width: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="normal14" color="#003399">
          {label}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {/* close icon */}
        <img src={chipCloseIcon} alt="chip-close-icon" />
      </div>
    </div>
  );
};

export default CustomChip;

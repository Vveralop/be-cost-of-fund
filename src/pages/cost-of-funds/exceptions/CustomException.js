import React from "react";
import { Button, Typography } from "@mui/material";
import SuccessIcon from "../../../assets/images/success-circle-icon.svg";
import WarningIcon from "../../../assets/images/warning-icon.svg";
import DisconnectIcon from "../../../assets/images/disconnect-icon.svg";

const SuccessExeption = ({
  type,
  mainMessage,
  secondaryMessage,
  textButtonAction,
  handleAction,
}) => {
  return (
    <div
      style={{
        width: "344px",
        height: "264px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <img
          src={
            type == "warning"
              ? WarningIcon
              : type == "success"
              ? SuccessIcon
              : DisconnectIcon
          }
          alt="exit-icon"
          width={type == "success" ? "35" : "56"}
          heigth={type == "success" ? "35" : "56"}
        />
      </div>
      {mainMessage && (
        <div
          style={{
            width: "344px",
            height: "72px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography
            variant="titleExeption"
            color="#231D19"
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {mainMessage}
          </Typography>
        </div>
      )}
      {secondaryMessage && (
        <div
          style={{
            width: "344px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Typography
            variant="titleExeption"
            color="#56504C"
            sx={{
              fontWeight: 400,
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {secondaryMessage}
          </Typography>
        </div>
      )}

      <Button
        variant="contained"
        sx={{ mr: 1, width: "100%", backgroundColor: "#003767" }}
        onClick={handleAction}
      >
        <Typography variant="textButton">{textButtonAction}</Typography>
      </Button>
    </div>
  );
};

export default SuccessExeption;

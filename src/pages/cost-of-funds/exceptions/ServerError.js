import React from "react";
// assets
import DisconnectedImg from "../../../assets/images/disconnected-img.svg";
import { Typography } from "@mui/material";

const ServerError = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #E5E5E5",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: 16,
        height: "567px",
      }}
    >
      <img src={DisconnectedImg} alt="exit-icon" width="104" heigth="104" />
      <Typography variant="titleH4" color="#56504C">
        Lo sentimos, no pudimos cargar la información
      </Typography>
      <Typography variant="subtitleH4" color="#56504C">
        estamos trabajando para solucionar el incoveniente.
      </Typography>
      <Typography variant="subtitleH4" color="#56504C">
        Por favor, inténtelo más tarde.
      </Typography>
    </div>
  );
};

export default ServerError;

import React from "react";
// Material-ui
import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
// assets
import FilterIcon from "../../../assets/images/filter-icon.svg";

const CustomFilterButtom = ({handleClick}) => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // console.log("filter-button", matchesXs);

  return (
    <div
      style={{
        width: "122px",
        height: "auto",
        padding: 8,
        marginLeft: matchesXs ? 0 : 8,
        borderRadius: "8px",
        border: "1px solid #D9D3CF",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-evenly",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={FilterIcon} alt="exit-icon" width="32" heigth="32" />
      </div>
      <div>
        <Typography variant="textButton" color="#56504C">
          Filtrar
        </Typography>
      </div>
    </div>
  );
};

export default CustomFilterButtom;

import React from "react";
import SimpleBar from "simplebar-react";
import { PropTypes } from "prop-types";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "../../../../../assets/images/close-icon.svg";
import "./LoadingModal.css";
import CustomItauLoader from "../../../../../components/customItauLoader/CustomItauLoader";



const LoadingModal = ({
  open,
  onClose,
  dialogTitle,
  dialogSubTitle,
  children,
}) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  if (!open) return null;
  return (
    <div className="overlay">
      <div
        className="modalContainer"
        style={{
          // ...(matchDownXL && {
          //   height: "500px",
          //   overflowY: "scroll"
          // }),
        }}
      >
  
          <div className="content">
            <div style={{
                width:"100%",
                height:"250px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }} >
                <div >
                <CustomItauLoader />
                </div>
                <div style={{paddingTop:"10px"}}>
                <Typography variant={matchDownXL ? "normalBold14" : "normalBold16"}>Estamos realizando tu simulación</Typography>
                </div>
                <div>
                <Typography variant={matchDownXL ? "normal14" : "normal16"}>Esto puede tardar algunos segundos. Por favor mantén abierto el navegador.</Typography>
                  
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default LoadingModal;

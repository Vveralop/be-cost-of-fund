import React from "react";
import SimpleBar from "simplebar-react";
import { PropTypes } from "prop-types";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "../../../assets/images/close-icon.svg";
import "./ItauCustomModal.css";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <div style={{ m: 0, p: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            p: 4,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <img src={CloseIcon} alt="close-icon" width="32" heigth="32" />
        </IconButton>
      ) : null}
    </div>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ItauCustomModal = ({
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
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="titleDialog" color="#EC7000">
              {dialogTitle}
            </Typography>
            <Typography variant="subTitleDialog" color="#231D19">
              {dialogSubTitle}
            </Typography>
            <Divider sx={{ mt: 1 }} />
          </div>
        </BootstrapDialogTitle>  
          <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default ItauCustomModal;

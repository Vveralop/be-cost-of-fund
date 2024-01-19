import React from "react";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "../../assets/images/close-icon.svg";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 4 }} {...other}>
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
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const {
    handleOpenDialog,
    handleCloseDialog,
    openDialog,
    dialogTitle,
    dialogSubTitle,
    dialogAction,
    withActionButton,
    fullMaxWidth,
    children,
    ...other
  } = props;

  return (
    <div>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        {...other}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialog}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="titleDialog" color="#EC7000">
              {dialogTitle}
            </Typography>
            <Typography variant="subTitleDialog" color="#231D19">
              {dialogSubTitle}
            </Typography>
            <Divider sx={{mt:1}}/>
          </div>
        </BootstrapDialogTitle>
        <DialogContent sx={{ 
          pr:4,
          pl: 4
          }} >
          {children}
        </DialogContent>
        {withActionButton && (
          <DialogActions sx={{ p: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleCloseDialog}
            >
              {dialogAction}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

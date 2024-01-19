import React from "react";
import Dialog from "@mui/material/Dialog";
import { Box, CircularProgress } from "@mui/material";

const ExceptionDialog = ({ loading, onClose, open, children }) => {
  return (
    <Dialog
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={onClose}
      open={open}
    >
      {loading === true ? (
        <Box
          sx={{
            display: "flex",
            width: "768px",
            height: "459px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "768px",
            height: "459px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* exeption */}
          {children}
        </Box>
      )}
    </Dialog>
  );
};

export default ExceptionDialog;

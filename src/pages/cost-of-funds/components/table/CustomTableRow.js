import React from "react";
import PropTypes from "prop-types";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Typography,useMediaQuery } from "@mui/material";

const CustomTableRow = ({ row, handleRowClick, selectedRowId }) => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <div
      key={row.id}
      onClick={() => handleRowClick(row)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: selectedRowId === row.id ? "#004480" : "inherit",
        cursor: "pointer",
        border: "1px solid rgba(91, 81, 73, 0.20)",
        borderRadius: "8px",
        boxShadow: "0px 1px 2px 0px rgba(91, 81, 73, 0.20)",
        marginTop:  matchDownXL? "12px": "16px",
        marginBottom: matchDownXL? "12px": "16px",
        width: "100%",
        minHeight: matchDownXL ? "44px": "52px",
        // paddingTop: "12px",
        // padding: "14px",
      }}
    >
      <div style={{ width: "60%", paddingLeft: 16 }}>
        <div>
          <Typography
            variant={ matchDownXL ? "displaySemiBold14":"displaySemiBold18"}
            color={selectedRowId === row.id ? "#FFFFFF" : "#56504C"}
            fontFamily="Roboto"
          >
            {row.productName}
          </Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "8px",
          width: "20%",
          // padding: 16,
        }}
      >
        <Typography
          variant={ matchDownXL ? "display14":"display18"}
          fontFamily="Roboto"
          color={selectedRowId === row.id ? "#FFFFFF" : "#56504C"}
        >
          {row.rateType === "Fixed" ? "Fija" : "Flotante"}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20%",
          // padding: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            width: "47px",
            padding: "4px 8px",
            borderRadius: "2px",
            backgroundColor: `${
              row.currency === "CLF"
                ? "#56504C"
                : row.currency === "USD"
                ? "#008859"
                : "#007AB7"
            }`,
          }}
        >
          <Typography
           variant={ matchDownXL ? "display14":"display18"}
            fontFamily="Roboto"
            color="#FFFFFF"
            // color={selectedRowId === row.id ? "#FFFFFF" : "#56504C"}
          >
            {row.currency === "CLF" ? "UF" : row.currency}
          </Typography>
        </div>
      </div>
    </div>
  );
};

CustomTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  selectedRowId: PropTypes.string,
};

export default CustomTableRow;

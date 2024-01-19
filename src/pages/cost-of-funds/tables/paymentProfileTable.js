import React, { useState } from "react";
import SimpleBar from "simplebar-react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import {useMediaQuery } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
// Itau One
import { OneTable, OnePagination } from "@itau-one/react";
import formatNumberTable from "../../cost-of-funds-quotes/forms/utils-form/formatNumberTable";

const PaymentProfileTable = ({ rows }) => {
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  const columns = [
    // { key: "id", label: "N° de cuota", sortable: true },
    { key: "date", label: "Fecha", sortable: true },
    { key: "disbursement", label: "Desembolso", sortable: true },
    { key: "redemption", label: "Amortización", sortable: true },
  ];
  // console.log("column", columns);
  // console.log("rows", rows);

  const totalPages = Math.ceil(rows.length/showCount);
  const startIndex = (currentPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentItems = rows.map(el=>{
    return {
      date: el.date,
      disbursement: el.disbursement == 0 ? "-" : formatNumberTable(el.disbursement),
      redemption: el.redemption == 0 ? "-" : formatNumberTable(el.redemption),
    }
  }).slice(startIndex, endIndex);

  // const tableValues = currentItems.map((el)=> {
  //   return {
  //     date: el.date,
  //     disbursement: el.disbursement == 0 ? "-" : formatNumberTable(el.disbursement),
  //     redemption: el.redemption == 0 ? "-" : formatNumberTable(el.redemption),
  //   }
  // })

  return (
    <div style={{ width: "100%" }}>
      <SimpleBar style={{ height: "100%", maxHeight: matchDownXL ? 200 :300 }}>
        <TableContainer
          component={Paper}
          sx={{ overflowX: "inherit" }}
        >
          <OneTable columns={columns} data={currentItems} theme="empresa" />
        </TableContainer>
      </SimpleBar>

      <div style={{marginTop:8}} className="d-flex align-items-center justify-content-end gap-12">
        <OnePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onLimitChange={setShowCount}
        />
      </div>
    </div>
  );
};

export default PaymentProfileTable;

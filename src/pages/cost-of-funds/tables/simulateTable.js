import React, { useState } from "react";
import SimpleBar from "simplebar-react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
// Itau One
import { OneTable, OnePagination } from "@itau-one/react";
import formatNumberTable from "../../cost-of-funds-quotes/forms/utils-form/formatNumberTable";


const Simulatetable = ({ rows }) => {
  const [showCount, setShowCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  console.log("rows", rows)

  let rowFormatted = rows ? rows.map((el)=>{
    return {
      id: el.id,
      _id: el._id,
      pay_date: el.pay_date,
      disbursement: formatNumberTable(el.disbursement),
      redemption: formatNumberTable(el.redemption),
      interest: formatNumberTable(el.interest),
      total: formatNumberTable(el.total)
    }
  }) : [];
  const columns = [
    { key: "id", label: "N° de cuota", sortable: true },
    { key: "pay_date", label: "Fecha de pago", sortable: true },
    { key: "disbursement", label: "Desembolso", sortable: true },
    { key: "redemption", label: "Amortización", sortable: true },
    { key: "interest", label: "Intereses", sortable: true },
    { key: "total", label: "Total", sortable: true },
  ];
  // console.log("column", columns);
  // console.log("rows", rows);

  const totalPages = Math.ceil(rowFormatted.length/showCount);
  const startIndex = (currentPage - 1) * showCount;
  const endIndex = startIndex + showCount;
  const currentItems = rowFormatted.slice(startIndex, endIndex);

  return (
    <div style={{ width: "100%"}}>
    {/* <div style={{ width: "100%"}}> */}
      <SimpleBar style={{ minHeight:"300px", maxHeight: "300px" }}>
      {/* <SimpleBar style={{ height: "100%", maxHeight: "auto" }}> */}
        <TableContainer
          component={Paper}
          sx={{ overflowX: "inherit", minWidth: "800px" }}
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

export default Simulatetable;

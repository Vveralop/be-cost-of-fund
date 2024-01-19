import React, { useState, useEffect } from "react";
// MSAL imports
import { useMsal } from "@azure/msal-react";
import SimpleBar from "simplebar-react";
// Material-ui
import { styled,useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import {
  CardContent,
  Typography,
  IconButton,
  CardHeader,
  Box,
  Portal,
  Card,
  useMediaQuery
} from "@mui/material";
import { OnePagination, OneIcon, OneButtonHub } from "@itau-one/react";
import { OjoHabilitadoOutline, CopiarOutline } from "@itau-one/icons";
import DetailsForm from "./forms/DetailsForm";
import TemporaryDrawer from "../../components/modal/drawer";
import StatusDot from "../../components/statusDot";
import { listCfQuotes, listCfQuotesByUser } from "../../config/api/services";
import cfQuoteListAdapter from "../../adapters/pricing/cfQuoteList.adapter";
import formatNumberTable from "./forms/utils-form/formatNumberTable";
import CustomDropdownSelect from "../../components/forms/custom-elements/custom-dropdown-select/CustomDropdownSelect";
import { uniqueKeyValues } from "../../utils/uniqueKeyValues";
import CustomItauLoader from "../../components/customItauLoader/CustomItauLoader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E5E8EF",
    color: "#231D19",
    height: "48px",
    fontSize: 16,
    textAlign: "left",
    [theme.breakpoints.down("xl")]: {
      fontSize: 11,
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "left",
    [theme.breakpoints.down("xl")]: {
      fontSize: 11,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5F5F6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const QuotesTable = (props, ref) => {
  const { instance } = useMsal();
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogAction, setDialogAction] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRow, setOpenRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [infoRow, setInfoRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCount, setShowCount] = useState(10);
  const [productValues, setProductValues] = useState([]);
  const [currencyValues, setCurrencyValues] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [productIndex, setProductIndex] = useState("");
  const [currencyIndex, setCurrencyIndex] = useState("");
  const [statusIndex, setStatusIndex] = useState("");
  const [loading, setLoading] = useState(true);

  const activeAccount = instance.getActiveAccount();
  const theme = useTheme();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  // const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  // const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  // console.log("sm: 768",matchDownSM)
  // console.log("md: 1024",matchDownMD)
  // console.log("lg: 1266",matchDownLG)
  // console.log("xl: 1536",matchDownXL)

  useEffect(() => {
    if (activeAccount) {
      let userId = activeAccount.username;
      userId = userId.split("@")[0];
      
      gettingCfQuoteList(userId);
    }
  }, []);

  const handleClickOpenDialog = (info, act) => {
    let dialogName = act === "view" ? "Detalle de la cotización" : "";
    let actionName = act === "view" ? "Recotizar" : "";

    setDialogAction(actionName);
    setDialogTitle(dialogName);
    setInfoRow(info);
    setOpenDrawer(true);
  };

  const handleClickCloseDialog = (e) => {
    setDialogTitle("");
    setDialogAction("");
    toggleDrawer(e);
    setInfoRow(null);
  };

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(!openDrawer);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    console.log("isAsc", isAsc);

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const gettingCfQuoteList = async (idUser) => {
    try {
     
     
      const result = await listCfQuotesByUser(idUser);
      // console.log("result_list_cfQuotes", result);
      if (result.statusCode === 200) {
        let rowsFormatted = cfQuoteListAdapter(
          result.data,
          handleClickOpenDialog
        );

        // console.log("rowsFormatted", rowsFormatted);

        setRows(rowsFormatted);
        let products = uniqueKeyValues(rowsFormatted, "productName");
        let currency = uniqueKeyValues(rowsFormatted, "currency");
        let status = uniqueKeyValues(rowsFormatted, "status");

        products = ["Producto", ...products];
        setProductValues(products);

        currency = ["Moneda", ...currency];
        setCurrencyValues(currency);

        status = ["Estado", ...status];
        setStatusValues(status);
        setLoading(false);
      }
    } catch (error) {
      console.log("error_list_cfQuotes", error);
      setLoading(false);
    }
  };

  const filteredRows = rows.filter((el) => {
    // console.log(
    //   "el?.productName?.toLowerCase()",
    //   el?.productName?.toLowerCase()
    // );
    // console.log("productIndex.toLowerCase()", productIndex.toLowerCase());
    // console.log("el?.currency.toLowerCase()", el?.currency.toLowerCase());
    // console.log("currencyIndex.toLowerCase()", currencyIndex.toLowerCase());
    // console.log("el?.status.toLowerCase()", el?.status.toLowerCase());
    // console.log("statusIndex.toLowerCase()", statusIndex.toLowerCase());

    if (currencyIndex !== "" && statusIndex !== "") {
      return (
        el?.productName?.toLowerCase().includes(productIndex.toLowerCase()) ||
        el?.currency.toLowerCase().includes(currencyIndex.toLowerCase()) ||
        el?.status.toLowerCase().includes(statusIndex.toLowerCase())
      );
    }

    if (productIndex !== "") {
      return el?.productName
        ?.toLowerCase()
        .includes(productIndex.toLowerCase());
    }
    if (currencyIndex !== "") {
      return el?.currency.toLowerCase().includes(currencyIndex.toLowerCase());
    }
    if (statusIndex !== "") {
      return el?.status.toLowerCase().includes(statusIndex.toLowerCase());
    }

    return el;
  });

  const sortedRows = filteredRows.sort((a, b) => {
    if (typeof a[orderBy] !== "number") {
      if (order === "asc") {
        if (a[orderBy]) {
          if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
            return -1;
          }
          if (a[orderBy].toLowerCase() > b[orderBy].toLowerCase()) {
            return 1;
          }

          return 0;
        }
      } else {
        if (a[orderBy]) {
          if (a[orderBy].toLowerCase() < b[orderBy].toLowerCase()) {
            return 1;
          }
          if (a[orderBy].toLowerCase() > b[orderBy].toLowerCase()) {
            return -1;
          }

          return 0;
        }
      }
    } else {
      if (order === "asc") {
        if (a[orderBy]) {
          if (a[orderBy] < b[orderBy]) {
            return -1;
          }
          if (a[orderBy] > b[orderBy]) {
            return 1;
          }

          return 0;
        }
      } else {
        if (a[orderBy]) {
          if (a[orderBy] < b[orderBy]) {
            return 1;
          }
          if (a[orderBy] > b[orderBy]) {
            return -1;
          }

          return 0;
        }
      }
    }
  });

  // Table handlers
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    currentPage > 0 ? Math.max(0, (1 + currentPage) * rows.length) : 0;

  const handlePage = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  const startIndex = (currentPage - 1) * showCount;
  const endIndex = startIndex + showCount;

  const hubOptions = [
    {
      label: "Copiar",
      href: "#",
      icon: <CopiarOutline />,
    },
  ];

  const Row = (props) => {
    const { row, idx } = props;

    const handleOpenRow = () => {
      console.log("idx", idx);
      if (row.id == openRow) {
        setOpenRow(null);
      } else {
        setOpenRow(row.id);
      }
    };

    const handleCollapseButtom = () => {
      row.handler(row, "view");
    };

    const isEven = (id) => {
      return id % 2 === 0;
    };

    const parseToPercentage = (value) => {
      const valueParsed = Number(value) * 100;
      return `${valueParsed.toFixed(2)}%`;
    };

    const currency = row.currency === "CLF" ? "UF" : row.currency;

    return (
      <StyledTableRow
        key={row.id}
        style={{
          backgroundColor: `${isEven(idx) ? "#F5F5F6" : "#FFFFFF"}`,
        }}
      >
        <StyledTableCell component="th" scope="row">
          {row.id}
        </StyledTableCell>
        <StyledTableCell align="right">{row.clientName}</StyledTableCell>
        <StyledTableCell align="right">{row.documentNumber}</StyledTableCell>
        <StyledTableCell align="right">{row.category}</StyledTableCell>
        <StyledTableCell align="right">
          {row.structure === "FixedRateCustom"
            ? "Pagos irregulares fija"
            : row.structure === "CustomFixedRate"
            ? "Pagos irregulares fija"
            : row.structure === "CustomFloatingRate"
            ? "Pagos irregulares flotante"
            : row.structure === "FixedRateBullet"
            ? "Bullet fijo"
            : row.structure === "FloatingRateBullet"
            ? "Bullet flotante"
            : row.structure === "EqualPayment"
            ? "Pagos iguales"
            : row.structure === "ZeroCouponFixedRate"
            ? "Cero fijo"
            : row.structure === "ZeroCouponFloatingRate"
            ? "Cero flotante"
            : row.structure === "FixedRateEqualRedemption"
            ? "Amortizaciones iguales fija"
            : row.structure === "FloatingRateEqualRedemption"
            ? "Amortizaciones iguales flotante"
            : row.structure}
        </StyledTableCell>
        <StyledTableCell align="right">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div>{formatNumberTable(row.notional)}</div>
          </div>
        </StyledTableCell>
        <StyledTableCell align="right">{currency}</StyledTableCell>
        <StyledTableCell align="right">
          {row.rateType ? (row.rateType === "Fixed" ? "Fija" : "Flotante") : ""}
        </StyledTableCell>
        <StyledTableCell align="right">
          {
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div>
                {row.status === "Pending"
                  ? "-"
                  : parseToPercentage(row.pricingValue)}
              </div>
            </div>
          }
        </StyledTableCell>
        <StyledTableCell align="right">
          {
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {<StatusDot status={row.status} />}

              <div style={{ marginLeft: "5px" }}>
                {row.status === "Pending"
                  ? "Pendiente"
                  : row.status === "Approved"
                  ? "Aprobado"
                  : row.status === "Expired"
                  ? "Expirado"
                  : row.status === "Rejected"
                  ? "Rechazado"
                  : row.status}
              </div>
            </div>
          }
        </StyledTableCell>
        <StyledTableCell align="center">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {
              <IconButton
                aria-label="expand row"
                size="small"
                // onClick={handleOpenRow}
              >
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={handleCollapseButtom}
                >
                  <OneIcon icon={<OjoHabilitadoOutline />} size={ matchDownXL ? "small" : "medium"} />
                </IconButton>
              </IconButton>
            }
          </div>
        </StyledTableCell>
      </StyledTableRow>
    );
  };

  return (
    <>
      <SimpleBar style={{ minHeight: "500px" }}>
        <Card sx={{ pt: 1 }}>
          <CardHeader
           
            subheader={
              <Typography variant={matchDownXL ? "textButtonSmall" : "textButton"} color="#56504C">
                Revisa el estado de tus cotizaciones realizadas
              </Typography>
            }
            action={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div style={{ width: matchDownXL ? "180px" : "208px" }}>
                  <CustomDropdownSelect
                    customLabel={"Producto"}
                    small={matchDownXL ? true : false}
                    options={productValues.map((el) => {
                      let value = el === "Producto" ? "" : el;
                      return {
                        label: el,
                        value: value,
                      };
                    })}
                    onSelect={(option) => {
                      console.log("option", option.value);
                      setProductIndex(option.value);
                    }}
                  />
                </div>
                <div style={{ width:matchDownXL ? "180px" : "208px", margin: "8px" }}>
                  <CustomDropdownSelect
                    customLabel={"Moneda"}
                    small={matchDownXL ? true : false}
                    options={currencyValues.map((el) => {
                      let label = el === "CLF" ? "UF" : el;
                      let value = label === "Moneda" ? "" : el;

                      return {
                        label: label,
                        value: value,
                      };
                    })}
                    onSelect={(option) => {
                      console.log("option", option.value);
                      setCurrencyIndex(option.value);
                    }}
                  />
                </div>
                <div style={{ width:matchDownXL ? "180px" : "208px", paddingRight:8 }}>
                  <CustomDropdownSelect
                    customLabel={"Estado"}
                    small={matchDownXL ? true : false}
                    options={statusValues.map((el) => {
                      let label =
                        el === "Approved"
                          ? "Aprobado"
                          : el === "Pending"
                          ? "Pendiente"
                          : el === "Rejected"
                          ? "Rechazado"
                          : el === "Expired"
                          ? "Expirado"
                          : el;

                      let value = el === "Estado" ? "" : el;
                      return {
                        label: label,
                        value: value,
                      };
                    })}
                    onSelect={(option) => {
                      console.log("option", option.value);
                      setStatusIndex(option.value);
                    }}
                  />
                </div>
                {/* <div
                  style={{
                    height: "48px",
                    margin: "0px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  <OneButtonHub items={hubOptions} />
                </div> */}
              </div>
            }
          />
          <CardContent
            sx={{
              height: "100%",
              overflowY: "auto",
              marginBottom: "10px",
              padding:"14px",
              paddingTop: "0px",
            }}
          >
            {loading === true ? (
              <div style={{height:"300px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <CustomItauLoader />
              </div>
            ) : (
              <>
                <Table sx={{ minWidth: 700 }} size="small" aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "id"}
                          direction={orderBy === "id" ? order : "asc"}
                          onClick={() => handleSort("id")}
                        >
                          ID
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell
                      // align="right"
                      >
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "clientName"}
                          direction={orderBy === "clientName" ? order : "asc"}
                          onClick={() => handleSort("clientName")}
                        >
                          Nombre
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell
                      // align="right"
                      >
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "documentNumber"}
                          direction={
                            orderBy === "documentNumber" ? order : "asc"
                          }
                          onClick={() => handleSort("documentNumber")}
                        >
                          RUT
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "category"}
                          direction={orderBy === "category" ? order : "asc"}
                          onClick={() => handleSort("category")}
                        >
                          Categoría
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "structure"}
                          direction={orderBy === "structure" ? order : "asc"}
                          onClick={() => handleSort("structure")}
                        >
                          Estructura
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "notional"}
                          direction={orderBy === "notional" ? order : "asc"}
                          onClick={() => handleSort("notional")}
                        >
                          Nocional
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "currency"}
                          direction={orderBy === "currency" ? order : "asc"}
                          onClick={() => handleSort("currency")}
                        >
                          Moneda
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "rateType"}
                          direction={orderBy === "rateType" ? order : "asc"}
                          onClick={() => handleSort("rateType")}
                        >
                          Tasa
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "pricingValue"}
                          direction={orderBy === "pricingValue" ? order : "asc"}
                          onClick={() => handleSort("pricingValue")}
                        >
                          CF
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "status"}
                          direction={orderBy === "status" ? order : "asc"}
                          onClick={() => handleSort("status")}
                        >
                          Estado
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell>Acciones</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {sortedRows.map((row, idx) => (
                    <Row key={row.id} row={row} idx={idx} />
                  ))} */}
                    {(showCount > 0
                      ? sortedRows.slice(startIndex, endIndex)
                      : sortedRows
                    ).map((row, idx) => (
                      <Row key={row.id} row={row} idx={idx} />
                    ))}
                  </TableBody>
                </Table>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px",
                  }}
                >
                  <OnePagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={handlePage}
                    onLimitChange={setShowCount}
                  />
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </SimpleBar>
      <Portal>
        <TemporaryDrawer
          anchor={"right"}
          toggleDrawer={toggleDrawer}
          open={openDrawer}
          dialogTitle={dialogTitle}
          dialogAction={dialogAction}
        >
          <DetailsForm data={infoRow} handleClose={handleClickCloseDialog} />
        </TemporaryDrawer>
      </Portal>
    </>
  );
};

export default QuotesTable;

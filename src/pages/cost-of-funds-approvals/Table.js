import React, { useState, useEffect, useCallback } from "react";
// MSAL imports
import { useMsal } from "@azure/msal-react";
import SimpleBar from "simplebar-react";
// Material-ui
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import {
  CardContent,
  Typography,
  IconButton,
  CardHeader,
  Box,
  Portal,
  Checkbox,
  Card,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  OnePagination,
  OneToast,
  OneButtonHub,
  OneIcon,
} from "@itau-one/react";
import { CopiarOutline, OjoHabilitadoOutline } from "@itau-one/icons";
import DetailsForm from "./forms/DetailsForm";
import TemporaryDrawer from "../../components/modal/drawer";
import StatusDot from "../../components/statusDot";
import { listCfQuotes, updateCfQuote } from "../../config/api/services";
import cfQuoteListAdapter from "../../adapters/pricing/cfQuoteList.adapter";
import formatNumberTable from "../cost-of-funds-quotes/forms/utils-form/formatNumberTable";
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

const QuotesApprovalTable = (props, ref) => {
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [enabledToast, setEnabledToast] = useState(false);
  const [quoteExecutiveId, setQuoteExecutiveId] = useState("");
  const [quoteExecutiveName, setQuoteExecutiveName] = useState("");
  const [productValues, setProductValues] = useState([]);
  const [currencyValues, setCurrencyValues] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [productIndex, setProductIndex] = useState("");
  const [currencyIndex, setCurrencyIndex] = useState("");
  const [statusIndex, setStatusIndex] = useState("");
  const [loading, setLoading] = useState(true);
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    if (activeAccount) {
      let executeName = activeAccount.name;
      let executeId = activeAccount.username;
      executeId = executeId.split("@")[0];
      setQuoteExecutiveId(executeId);
      setQuoteExecutiveName(executeName);
    }

    gettingCfQuoteList();
  }, [updated]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  console.log("selectedRows", selectedRows);

  const handleClick = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, 1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

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

  const strokeToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleShowToast = () => {
    setEnabledToast(true);
    setTimeout(() => {
      setEnabledToast(false);
    }, 3000);
  };

  const handleBulkRejected = async () => {
    try {
      const requests = selectedRows.map((id) => {
        return {
          id: id,
          quote: {
            status: "Rejected",
            approvedBy: quoteExecutiveId,
            approvedByName: quoteExecutiveName,
          },
        };
      });

      const result = await updateCfQuote(requests);
      if (result.statusCode === 200) {
        setUpdated(true);
        handleShowToast();
      }
    } catch (error) {
      console.log("BULK_APPROVE_ERROR");
    }
  };
  const handleBulkApproved = async () => {
    try {
      const requests = selectedRows.map((id) => {
        return {
          id: id,
          quote: {
            status: "Approved",
            approvedBy: quoteExecutiveId,
            approvedByName: quoteExecutiveName,
          },
        };
      });

      const result = await updateCfQuote(requests);
      if (result.statusCode === 200) {
        setUpdated(true);
        handleShowToast();
      }
    } catch (error) {
      console.log("APPROVE_QUOTE_ERROR", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    console.log("isAsc", isAsc);

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const gettingCfQuoteList = async () => {
    try {
      const result = await listCfQuotes();
      console.log("result_list_cfQuotes", result);
      if (result.statusCode === 200) {
        let rowsFormatted = cfQuoteListAdapter(
          result.data,
          handleClickOpenDialog
        );

        console.log("rowsFormatted", rowsFormatted);

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
      }
      setUpdated(false);
      setLoading(false);
    } catch (error) {
      setUpdated(false);
      setLoading(false);
      console.log("error_list_cfQuotes", error);
    }
  };

  const filteredRows = rows.filter((el) => {
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

  console.log("filteredRows", filteredRows);

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

  console.log("sortedRows", sortedRows);

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

  let disabled = selectedRows.length > 0 ? false : true;

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
      <>
        <StyledTableRow
          key={row.id}
          style={{
            backgroundColor: `${isEven(idx) ? "#F5F5F6" : "#FFFFFF"}`,
          }}
          selected={isSelected(row.id)}
        >
          <StyledTableCell component="th" scope="row">
            <Checkbox
              checked={isSelected(row.id)}
              onClick={() => handleClick(row.id)}
              size={matchDownXL ? "small" : "medium"}
              sx={{
                "&.Mui-checked": {
                  color: "#FF5500",
                },
              }}
            />
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {row.validUntil}
          </StyledTableCell>
          <StyledTableCell align="right">{row.clientName}</StyledTableCell>
          <StyledTableCell align="right">{row.documentNumber}</StyledTableCell>
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
            {row.rateType
              ? row.rateType === "Fixed"
                ? "Fija"
                : "Flotante"
              : ""}
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
          {/* <StyledTableCell component="th" scope="row">
            {row.quotingExecutive}
          </StyledTableCell> */}
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
                    <OneIcon
                      icon={<OjoHabilitadoOutline />}
                      size={matchDownXL ? "small" : "medium"}
                    />
                  </IconButton>
                </IconButton>
              }
            </div>
          </StyledTableCell>
        </StyledTableRow>
      </>
    );
  };

  return (
    <>
      <SimpleBar style={{ minHeight: "500px" }}>
        <Card sx={{ pt: 1 }}>
          <CardHeader
            subheader={
              <Typography variant={matchDownXL ? "textButtonSmall" : "textButton"} color="#56504C">
                Aprobaciones realizadas.
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
                <div
                  style={{
                    width: matchDownXL ? "180px" : "208px",
                    margin: "8px",
                  }}
                >
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
                <div
                  style={{
                    width: matchDownXL ? "180px" : "208px",
                    paddingRight: 8,
                  }}
                >
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
              padding: "14px",
              paddingTop: "0px",
            }}
          >
            {loading === true ? (
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomItauLoader />
              </div>
            ) : (
              <>
                {updated === true && (
                  <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="secondary" />
                  </Stack>
                )}
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        sx={{ paddingTop: "12px", paddingBottom: "12px" }}
                      >
                        <Checkbox
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < rows.length
                          }
                          checked={selectedRows.length === rows.length}
                          onChange={handleSelectAllClick}
                          size={matchDownXL ? "small" : "medium"}
                          sx={{
                            "&.Mui-checkbox-indeterminate": {
                              color: "#FF5500",
                            },
                            "&.Mui-checked": {
                              color: "#FF5500",
                            },
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <TableSortLabel
                          sx={{ backgroundColor: "#E5E8EF" }}
                          active={orderBy === "validUntil"}
                          direction={orderBy === "validUntil" ? order : "asc"}
                          onClick={() => handleSort("validUntil")}
                        >
                          Validez
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
      <Box
        display="flex"
        width={"100%"}
        marginTop={"12px"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
      >
        <Box
          display="flex"
          width={"30%"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
        >
          <Button
            variant={disabled ? "contained" : "outlined"}
            disabled={disabled}
            size={matchDownXL ? "small":"large"}
            sx={{
              mr: 1,
              width: "100%",
              height: matchDownXL ? "33px": "100%",
              maxWidth: "228px",
            }}
            onClick={() => handleBulkRejected()}
          >
            <Typography
              variant={matchDownXL ? "textButtonSmall" : "textButton"}
              color={disabled ? "#56504C" : "#EC7000"}
            >
              Rechazar
            </Typography>
          </Button>
          <Button
            variant="contained"
            disabled={disabled}
            size={matchDownXL ? "small":"large"}
            sx={{
              width: "100%",
              maxWidth: "228px",
              height: matchDownXL ? "33px": "100%",
              backgroundColor: "#003767",
            }}
            onClick={() => handleBulkApproved()}
          >
            <Typography
              variant={matchDownXL ? "textButtonSmall" : "textButton"}
              color={disabled ? "#56504C" : "#FFFFFF"}
            >
              Aprobar
            </Typography>
          </Button>
        </Box>
      </Box>

      {enabledToast && (
        <OneToast type="success" hideCallback={() => setEnabledToast(false)}>
          ¡Su cotización ha sido actualizada con éxito!
        </OneToast>
      )}
      <Portal>
        <TemporaryDrawer
          anchor={"right"}
          toggleDrawer={toggleDrawer}
          open={openDrawer}
          dialogTitle={dialogTitle}
          dialogAction={dialogAction}
        >
          <DetailsForm
            data={infoRow}
            handleClose={handleClickCloseDialog}
            handleCloseForced={strokeToggleDrawer}
            handleShowToast={handleShowToast}
            setUpdated={setUpdated}
          />
        </TemporaryDrawer>
      </Portal>
    </>
  );
};

export default QuotesApprovalTable;

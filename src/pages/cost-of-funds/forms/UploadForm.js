import React, { useState, useEffect, useContext, useCallback } from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button, Typography, useMediaQuery } from "@mui/material";
import { CostfundContext } from "../../../contexts/costfund.context";
import ExcelTableIcon from "../../../assets/images/xlsTableIcon.svg";
import ExcelTableIconDisabled from "../../../assets/images/xlsTableIcon-disabled.svg";
import GraphicIcon from "../../../assets/images/graphics.svg";
import GraphicDisabledIcon from "../../../assets/images/graphics-disabled.svg";
import PaymentProfileTable from "../tables/paymentProfileTable";
// Itau One
import { OneAlert, OneEmptyState } from "@itau-one/react";
import CustomPasteButton from "./components/CustomPasteButton";
import CustomDownloadButton from "./components/CustomDownloadButton";
import CustomButtonTab from "./components/CustomButtonTab";
import CustomGraphicComponent from "./components/CustomGraphicComponent";
import { validateIrregularProfile } from "../../../utils/validateIrregularProfile";
import parserExcelValues from "./utils-form/parsingExcelValues.form";
import gettingTenorFromDate from "../../../utils/gettingTenorFromDate";
import parseFullTenorToDayTenor from "../../../utils/parseFullTenorToDayTenor";
import CustomTableEmptyState from "../../../components/customEmptyState/CustomTableEmptyState";
import CustomWarningAlert from "../../../components/alerts/CustomWarningAlert";

const UploadForm = (props) => {
  const { handleCloseDialog, handleHiddenFields, setValue } = props;
  const { cashflows, setCashflows, quoteParameters, setQuoteParameters } =
    useContext(CostfundContext);
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [alerts, setAlerts] = useState({
    showAlert: false,
    type: "context",
    title: "Alert",
    message: "",
  });
  const [dataRows, setDataRows] = useState([]);
  const { showAlert, type, title, message } = alerts;
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    if (cashflows.length > 0) {
      setDataRows(cashflows);
    }
  }, []);

  const saveCashflows = () => {
    console.log("cashflows", dataRows);
    handleCloseDialog();
  };

  const handleTabs = (tab) => {
    setActiveTab(tab);
  };

  function createData(id, start_date, end_date, cashflow) {
    return { id, start_date, end_date, cashflow };
  }

  function hideAlerts() {
    setTimeout(() => {
      setAlerts({
        ...alerts,
        showAlert: false,
        type: "context",
        title: "Alert",
        message: "",
      });
    }, 4000);
  }

  const downloadFile = async () => {
    console.log("here");
    const response = await fetch("/template_irregular_payments.xlsm");
    const blob = await response.blob();

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_irregular_payments.xlsm";
    document.body.appendChild(a);
    // Trigger the download
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePaste = useCallback(() => {
    const text = navigator.clipboard.readText();
    text.then((lines) => {
      const cleanLines = lines.split("\r\n").filter((line) => line.length > 0);
      console.log("clean-lines", cleanLines);
      const redemptions = cleanLines.map((line) => {
        const values = line.split("\t");

        console.log("values", values.length);

        if (values.length !== 3) {
          setAlerts({
            ...alerts,
            showAlert: true,
            title: "Error",
            type: "error",
            message:
              "Los datos copiados son inválidos, por favor verifícalos e intentalo nuevamente.",
          });
          hideAlerts();
          throw new Error();
        }

        // formated dates
        const date = values[0];
        const disbursement = parserExcelValues(values[1]);
        const redemption = parserExcelValues(values[2]);
        console.log("cleaned-values", {
          date,
          disbursement,
          redemption,
        });

        return {
          date,
          disbursement,
          redemption,
        };
      });
      console.log("redemptions", redemptions);
      console.log("aqii", typeof Number("hola"));
      if (validateIrregularProfile(redemptions)) {
        // Setting StartTenor | EndTenor | FrecuencyPayments

        let startDate = redemptions[0].date;
        let endDate = redemptions[redemptions.length - 1].date;

        console.log("startDate", startDate);
        console.log("endDate", endDate);
        try {
          startDate = gettingTenorFromDate(startDate);
          console.log(startDate);
          endDate = gettingTenorFromDate(endDate);
          const parseToDays = parseFullTenorToDayTenor(endDate);
          if (parseToDays) {
            endDate = parseToDays;
          }

          console.log("startDate", startDate);
          console.log("endDate", endDate);

          // Setting hidden fields
          handleHiddenFields(startDate, endDate);

          // Setting Notional, CashFlows and DataRows
          let notionalFromRedemptions = redemptions.map((el) => el.redemption);
          notionalFromRedemptions = notionalFromRedemptions.reduce(
            (curr, acc) => curr + acc
          );
          console.log("notionalFromRedemptions", notionalFromRedemptions);
          // setQuoteParameters({
          //   ...quoteParameters,
          //   notional: notionalFromRedemptions,
          // });
          setValue("notional", notionalFromRedemptions);
          setCashflows(redemptions);
          setDataRows(redemptions);
        } catch (error) {
          setAlerts({
            ...alerts,
            showAlert: true,
            title: "Error",
            type: "error",
            message:
              "Las fechas ingresadas en la tabla son inválidas, por favor verifícalas e intentalo nuevamente.",
          });
          hideAlerts();
        }
      } else {
        setAlerts({
          ...alerts,
          showAlert: true,
          title: "Error",
          type: "error",
          message:
            "Los datos copiados son inválidos, por favor verifícalos e intentalo nuevamente.",
        });
        hideAlerts();
        throw new Error();
      }
    });
  }, []);

  const handleCleanRows = () => {
    setCashflows([]);
    setDataRows([]);
    handleTabs(0);
  };

  let responsiveIconSize = matchDownXL ? "24px" : "32px";

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={matchDownXL ? 1 : 2}>
        <Grid item lg={12} md={12} sm={12}>
          {/* tabs */}
          <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <CustomButtonTab
              handleClick={() => handleTabs(0)}
              active={activeTab === 0}
            >
              {
                <>
                  <div>
                    <img
                      src={
                        activeTab === 0
                          ? ExcelTableIcon
                          : ExcelTableIconDisabled
                      }
                      alt="table-view"
                      style={{
                        width: responsiveIconSize,
                        height: responsiveIconSize,
                      }}
                      // style={{ backgroundColor: "#EFE9E5" }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant={matchDownXL ? "normal14" : "normal16"}
                      color={activeTab === 0 ? "#EC7000" : "#EFE9E5"}
                    >
                      Vista tabla
                    </Typography>
                  </div>
                </>
              }
            </CustomButtonTab>
            <CustomButtonTab
              handleClick={() => handleTabs(1)}
              active={activeTab === 1}
            >
              {
                <>
                  <div>
                    <img
                      src={activeTab === 1 ? GraphicIcon : GraphicDisabledIcon}
                      alt="table-view"
                      style={{
                        width: responsiveIconSize,
                        height: responsiveIconSize,
                      }}
                    />
                  </div>
                  <div>
                    <Typography
                      variant={matchDownXL ? "normal14" : "normal16"}
                      color={activeTab === 1 ? "#EC7000" : "#EFE9E5"}
                    >
                      Vista gráfico
                    </Typography>
                  </div>
                </>
              }
            </CustomButtonTab>
          </div>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          {activeTab === 0 ? (
            <>
              {/* empty state */}
              {dataRows.length < 1 && (
                <>
                  <CustomTableEmptyState />
                  <br />
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <CustomDownloadButton handlePaste={() => downloadFile()} />
                    &nbsp;
                    <CustomPasteButton handleClick={handlePaste} />
                  </div>
                </>
              )}
              {/* table */}
              {dataRows.length > 0 && <PaymentProfileTable rows={dataRows} />}
            </>
          ) : (
            <>
              {dataRows.length < 1 && <CustomTableEmptyState />}
              {dataRows.length > 0 && (
                <CustomGraphicComponent rows={dataRows} />
              )}
            </>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          {showAlert && (
            <CustomWarningAlert mainMessage={title} secondMessage={message} type="error" />
          )}
          <Box
            display="flex"
            sx={{
              mt: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {/* BUTON CUSTOM */}

            <div style={{ margin: matchDownXL ? "0px 2px" : "0px 8px" }}>
              <Button
                variant="contained"
                size={matchDownXL ? "small" : "medium"}
                sx={{
                  color: "#EC7000",
                  backgroundColor: "#FFFFFF",
                  border: "2px #EC7000 solid",
                  borderRadius: "10px",
                }}
                onClick={handleCleanRows}
              >
                <Typography
                  variant={matchDownXL ? "textButtonSmall" : "textButton"}
                >
                  Borrar
                </Typography>
              </Button>
            </div>
            {/* Save-Quote-button */}
            <div style={{ margin: matchDownXL ? "0px 4px" : "0px 8px" }}>
              <Button
                variant="contained"
                size={matchDownXL ? "small" : "medium"}
                sx={{
                  backgroundColor: "#003767",
                  border: "2px #003767 solid",
                  borderRadius: "10px",
                }}
                onClick={saveCashflows}
              >
                <Typography
                  variant={matchDownXL ? "textButtonSmall" : "textButton"}
                >
                  Guardar
                </Typography>
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadForm;

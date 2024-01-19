import React, { useState, useContext, useEffect } from "react";
import SimpleBar from "simplebar-react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button, Typography, useMediaQuery } from "@mui/material";
import CopyIcon from "../../../assets/images/copy-icon.svg";
import CopyCheckIcon from "../../../assets/images/copy-check-icon.svg";
import EditIcon from "../../../assets/images/edit-pencil-icon.svg";
import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";
//
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Simulatetable from "../tables/simulateTable";
import { CostfundContext } from "../../../contexts/costfund.context";
//
import WarningIcon from "../../../assets/images/warning-icon.svg";
import UnderlinedCustomButtom from "./components/UnderlinedCustomButtom";
import stringParseFrecuencyPayment from "../../../utils/stringParseFrecuencyPayment";
import { saveCfQuote } from "../../../config/api/services";
import CustomWarningAlert from "../../../components/alerts/CustomWarningAlert";
import parseFullTenorToDayTenor from "../../../utils/parseFullTenorToDayTenor";

const validationSchema = Yup.object().shape({
  product: Yup.string().required("Estructura es requerido"),
  // .max(25, "No debe exceder los 25 caracteres."),
  rate: Yup.string()
    .required("Tasa es requerida")
    .max(50, "No debe exceder los 50 caracteres."),
  currency: Yup.string()
    .required("Moneda es requerida")
    .max(50, "No debe exceder los 50 caracteres."),
  start_date: Yup.string()
    .required("Desembolso es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  end_date: Yup.string()
    .required("Desembolso es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  payment_frecuency: Yup.string().required("Frecuencia de pago es requerido"),
  // .max(25, "No debe exceder los 25 caracteres."),
  notional: Yup.string()
    .required("Nocional es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  cFund: Yup.string()
    .required("CF es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  duration: Yup.string()
    .required("Duración es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
});

const SimulateQuoteForm = (props) => {
  const { handleCloseDialog, setExceptionValues } = props;
  const { quoteParameters, instrument, pricingResult } =
    useContext(CostfundContext);
  const [copied, setCopied] = useState(false);
  const [pricingPending, setPricingPending] = useState(false);
  const [dataRows, setDataRows] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  // React-hook-form
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      product: "",
      rate: "",
      currency: "",
      start_date: "",
      end_date: "",
      payment_frecuency: "",
      notional: "",
      cFund: "",
      duration: "",
    },
  });

  useEffect(() => {
    gettingQuoteInfo();
  }, []);

  //   console.log("errors", errors);

  const gettingQuoteInfo = () => {
    const quoteInfo = quoteParameters;
    const pricingInfo = pricingResult;
    console.log("quoteInfo", quoteInfo);
    console.log("pricing_result", pricingInfo);

    if (pricingInfo.status == "Pending") {
      setPricingPending(true);
      setDataRows([]);
    } else {
      setPricingPending(false);

      let cashflowsData = pricingInfo?.cashflows;
      console.log("cashflowsData", cashflowsData);
      cashflowsData = cashflowsData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      cashflowsData = cashflowsData.map((item, idx) => {
        let interests = item.fixedRateCoupon + item.floatingRateCoupon;
        let totals = interests + item.redemption - item.disbursement;

        return createData(
          idx,
          item.date,
          item.disbursement.toFixed(4),
          item.redemption.toFixed(4),
          interests.toFixed(4),
          totals.toFixed(4)
        );
      });

      setDataRows(cashflowsData);
    }

    for (let key in quoteInfo) {
      if (key == "payment_frecuency") {
        setValue(`${key}`, `${stringParseFrecuencyPayment(quoteInfo[key])}`);
      } else if (key == "cFund") {
        setValue(`${key}`, `${(quoteInfo[key] * 100).toFixed(2)}%`);
      } else if (key == "duration") {
        setValue(`${key}`, `${quoteInfo[key].toFixed(2)}`);
      } else {
        setValue(`${key}`, `${quoteInfo[key]}`);
      }
    }
  };

  // const parseToDays = parseFullTenorToDayTenor(quoteInfo[key]);

  const saveQuote = async (data) => {
    console.log(data);
    // Save Quote request
    handleCloseDialog("save");
  };

  function createData(id, pay_date, disbursement, redemption, interest, total) {
    return { id, _id: id, pay_date, disbursement, redemption, interest, total };
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    setCopied(true);

    // const rows = sortedRows.map((row) => [
    const rows = dataRows.map((row) => [
      row.id,
      row.pay_date,
      row.disbursement,
      row.redemption,
      row.interest,
      row.total,
    ]);
    const csvContent = rows.map((row) => row.join(",")).join("\n");
    // Setting column header names
    const csvWithHeader = `${"ID,Fecha de pago,Desembolso,Amortización,Interes,total\n"}${csvContent}`;
    // console.log("Data copied to clipboard",csvWithHeader);
    navigator.clipboard.writeText(csvWithHeader).then(
      () => {
        console.log("Data copied to clipboard");
        setCopied(true);
      },
      (err) => {
        console.log("Error copying to clipboard", err);
      }
    );
  };

  return (
    <SimpleBar style={{ height: "75vh" }}>
      <Box sx={{ width: "100%", mt: 1 }}>
        <Grid container spacing={matchDownXL ? 1 : 2}>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Producto</CustomFormLabel> */}
            <Controller
              name="product"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="product"
                  size="small"
                  type="text"
                  label="Estructura"
                  variant="outlined"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.product ? true : false}
                  helperText={errors.product?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Tasa</CustomFormLabel> */}
            <Controller
              name="rate"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="rate"
                  size="small"
                  type="text"
                  variant="outlined"
                  label="Tasa"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.rate ? true : false}
                  helperText={errors.rate?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Moneda</CustomFormLabel> */}
            <Controller
              name="currency"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="currency"
                  size="small"
                  type="text"
                  variant="outlined"
                  label="Moneda"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.currency ? true : false}
                  helperText={errors.currency?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Desembolso</CustomFormLabel> */}
            <Controller
              name="start_date"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="start_date"
                  size="small"
                  type="text"
                  variant="outlined"
                  label="Desembolso"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.start_date ? true : false}
                  helperText={errors.start_date?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Desembolso</CustomFormLabel> */}
            <Controller
              name="end_date"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="end_date"
                  size="small"
                  type="text"
                  variant="outlined"
                  label="Vencimiento"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.end_date ? true : false}
                  helperText={errors.end_date?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Frecuencia de pago</CustomFormLabel> */}
            <Controller
              name="payment_frecuency"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="payment_frecuency"
                  size="small"
                  type="text"
                  variant="outlined"
                  label="Frecuencia de pago"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.payment_frecuency ? true : false}
                  helperText={errors.payment_frecuency?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <CustomFormLabel>Nocional</CustomFormLabel> */}
            <Controller
              name="notional"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  id="notional"
                  size="small"
                  type="text"
                  variant="outlined"
                  label="Nocional"
                  fullWidth
                  {...field}
                  disabled
                  error={errors.notional ? true : false}
                  helperText={errors.notional?.message}
                />
              )}
            />
          </Grid>
          {pricingPending !== true && (
            <Grid item xs={12} md={6} lg={6}>
              {/* <CustomFormLabel>CF</CustomFormLabel> */}
              <Controller
                name="cFund"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <CustomTextField
                    id="cFund"
                    size="small"
                    type="text"
                    variant="outlined"
                    label="CF"
                    fullWidth
                    {...field}
                    disabled
                    error={errors.cFund ? true : false}
                    helperText={errors.cFund?.message}
                  />
                )}
              />
            </Grid>
          )}

          {pricingPending !== true && (
            <Grid item xs={12} md={6} lg={6}>
              {/* <CustomFormLabel>Duración</CustomFormLabel> */}
              <Controller
                name="duration"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <CustomTextField
                    id="duration"
                    size="small"
                    type="text"
                    variant="outlined"
                    label="Duración"
                    fullWidth
                    {...field}
                    disabled
                    error={errors.duration ? true : false}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item lg={12} md={12} sm={12}>
            <Box display="flex" sx={{ width: "100%" }}>
              {pricingPending == true ? (
                <CustomWarningAlert
                  mainMessage={
                    "Excede los parámetros establecidos para el producto"
                  }
                  secondMessage={
                    "Esta simulación se revisará con la mesa de dinero antes de su aprobación. Si tienes dudas, escribenos a costode.fondo@itau.cl"
                  }
                />
              ) : (
                <Simulatetable rows={dataRows} />
              )}
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Box
              display="flex"
              sx={{ mt: 1, flexDirection: "row", justifyContent: "flex-end" }}
            >
              <UnderlinedCustomButtom
                title={"Copiar"}
                handler={handleCopy}
                flag={copied}
                mainIcon={CopyIcon}
                secondaryIcon={CopyCheckIcon}
              />

              {/* Save-Quote-button */}
              <div style={{ margin: "0px 8px" }}>
                <Button
                  variant="contained"
                  size={matchDownXL ? "small":"large"}
                  sx={{ backgroundColor: "#003767", borderRadius: "10px" }}
                  onClick={handleSubmit(saveQuote)}
                >
                  <Typography variant={matchDownXL ? "textButtonSmall" : "textButton"}>Cotizar</Typography>
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SimpleBar>
  );
};

export default SimulateQuoteForm;

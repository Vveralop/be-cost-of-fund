import React, { useState, useEffect } from "react";
// MSAL imports
import { useMsal } from "@azure/msal-react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button, Typography, useMediaQuery } from "@mui/material";

import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";
//
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import formatNumberTable from "../../cost-of-funds-quotes/forms/utils-form/formatNumberTable";
import { updateCfQuote } from "../../../config/api/services";

const validationSchema = Yup.object().shape({
  id: Yup.string().required("Id es requerido"),
  document_number: Yup.string().required("Rut es requerido"),
  quote_executive: Yup.string().required("Ejecutivo cotizante es requerido"),
  commercial_executive: Yup.string().required(
    "Ejecutivo comercial es requerido"
  ),
  name: Yup.string().required("Nombre es requerido"),
  validUntil: Yup.string(),
  rateType: Yup.string(),
  status: Yup.string(),
  structure: Yup.string().required("Estructura es requerido"),
  notional: Yup.string().required("Nocional es requerido"),
  currency: Yup.string().required("Moneda es requerido"),
  costFund: Yup.string().required("Costo de fondo es requerido"),
  spread: Yup.string().required("Costo de fondo es requerido"),
});

const DetailsForm = (props) => {
  const { data, handleClose, handleCloseForced, handleShowToast, setUpdated } =
    props;
  const [quoteExecutiveId, setQuoteExecutiveId] = useState("");
  const [quoteExecutiveName, setQuoteExecutiveName] = useState("");
  const [disabled, setDisabled] = useState(false);

  // React-hook-form
  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: "ADX1CS234F",
      document_number: "26.635.460-5",
      quote_executive: "Victor Caceres",
      commercial_executive: "Gustavo Yañez",
      name: "Dummy SPA",
      segment: "Minorista",
      comments: "...",
      structure: "Pagos iguales",
      notional: "1.000.000.000",
      moneda: "CLP",
      Tasa: "Fija",
      costFund: "3.51",
      spread: "2.03",
    },
  });

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
      console.log("data", data);
    }
    settingInitValues();
  }, []);

  //   console.log("errors", errors);

  const parseToPercentage = (value) => {
    const valueParsed = Number(value) * 100;
    return `${valueParsed.toFixed(2)}%`;
  };

  const settingInitValues = () => {
    let initValues = {
      id: data.id,
      document_number: data.documentNumber,
      quote_executive: data.quotingExecutiveName,
      commercial_executive: data.assignedExecutive,
      name: data.clientName,
      validUntil: data.validUntil,
      status:
        data.status === "Pending"
          ? "Pendiente"
          : data.status === "Approved"
          ? "Aprobado"
          : data.status === "Expired"
          ? "Expirado"
          : data.status === "Rejected"
          ? "Rechazado"
          : data.status,
      rateType: data.rateType
        ? data.rateType === "Fixed"
          ? "Fija"
          : "Flotante"
        : "",
      structure:
      data.structure === "FixedRateCustom"
      ? "Pagos irregulares fija"
      : data.structure === "CustomFixedRate"
      ? "Pagos irregulares fija"
      : data.structure === "CustomFloatingRate"
      ? "Pagos irregulares flotante"
      : data.structure === "FixedRateBullet"
      ? "Bullet fijo"
      : data.structure === "FloatingRateBullet"
      ? "Bullet flotante"
      : data.structure === "EqualPayment"
      ? "Pagos iguales"
      : data.structure === "ZeroCouponFixedRate"
      ? "Cero fijo"
      : data.structure === "ZeroCouponFloatingRate"
      ? "Cero flotante"
      : data.structure === "FixedRateEqualRedemption"
      ? "Amortizaciones iguales fija"
      : data.structure === "FloatingRateEqualRedemption"
      ? "Amortizaciones iguales flotante"
      : data.structure,
      notional: formatNumberTable(data.notional),
      currency: data.currency === "CLF" ? "UF" : data.currency,
      costFund: parseToPercentage(data.pricingValue),
      spread: data.spread,
    };

    if (data.status !== "Pending") {
      setDisabled(true);
    }

    for (let key in initValues) {
      setValue(`${key}`, `${initValues[key]}`);
    }
  };

  const approveQuote = async (data) => {
    try {
      const parRateValue = convertPercentageToNumber(data.costFund);

      if (!parRateValue) {
        setError("costFund", {
          type: "custom",
          message: "Valor inválido. Por favor ingresa un porcentaje válido.",
        });

        setTimeout(() => {
          clearErrors(["costFund"]);
        }, 5000);

        return;
      }

      const request = [
        {
          id: data.id,
          quote: {
            status: "Approved",
            approvedBy: quoteExecutiveId,
            approvedByName: quoteExecutiveName,
          },
          pricing: {
            parRate: {
              value: parRateValue,
            },
          },
        },
      ];

      const result = await updateCfQuote(request);
      if (result.statusCode === 200) {
        setUpdated(true);
        handleCloseForced();
        handleShowToast();
      }
    } catch (error) {
      console.log("APPROVE_QUOTE_ERROR", error);
    }
  };

  const rejectQuote = async (data) => {
    try {
      const parRateValue = convertPercentageToNumber(data.costFund);

      if (!parRateValue) {
        setError("costFund", {
          type: "custom",
          message: "Valor inválido. Por favor ingresa un porcentaje válido.",
        });

        setTimeout(() => {
          clearErrors(["costFund"]);
        }, 5000);

        return;
      }

      const request = [
        {
          id: data.id,
          quote: {
            status: "Rejected",
            approvedBy: quoteExecutiveId,
            approvedByName: quoteExecutiveName,
          },
          pricing: {
            parRate: {
              value: parRateValue,
            },
          },
        },
      ];

      const result = await updateCfQuote(request);
      if (result.statusCode === 200) {
        setUpdated(true);
        handleCloseForced();
        handleShowToast();
      }
    } catch (error) {
      console.log("REJECTED_QUOTE_ERROR", error);
    }
  };

  const convertPercentageToNumber = (percentage) => {
    // Remove any non-numeric characters from the input
    const numericValue = parseFloat(percentage.replace(/[^\d.,]/g, ""));

    // Check if the numericValue is a valid number
    if (isNaN(numericValue)) {
      return null;
    }

    // Divide the numeric value by 100 and round to 4 decimal places
    const result = numericValue / 100;

    return parseFloat(result.toFixed(4));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "90vh",
        p: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            {/* id-input */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: matchDownXL ? "48px" : "56px",
                border: "1px solid #D9D3CF",
                borderRadius: "8px",
                backgroundColor: "#E5E8EF",
                padding: matchDownXL ? "14px" : "16px",
              }}
            >
              <div>
                <Typography variant={matchDownXL ? "titleBreadcrumb" :"h5"}>ID de la cotización</Typography>
              </div>
              <div>
                <Controller
                  name="id"
                  control={control}
                  defaultValue={""}
                  render={({ field: { value } }) => (
                    <Typography variant={matchDownXL ? "titleBreadcrumb" :"h5"}>{value}</Typography>
                  )}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {""}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant={matchDownXL ? "titleBreadcrumb" :"h5"}>Datos del cliente</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {""}
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Nombre"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  {...field}
                  variant="standard"
                  defaultValue={""}
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="document_number"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="RUT"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.document_number ? true : false}
                  helperText={errors.document_number?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Controller
              name="quote_executive"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Ejecutivo cotizante"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.quote_executive ? true : false}
                  helperText={errors.quote_executive?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {""}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant={matchDownXL ? "titleBreadcrumb" :"h5"}>Datos de la Cotización</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {""}
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="validUntil"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Válido hasta"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.validUntil ? true : false}
                  helperText={errors.validUntil?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="structure"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Estructura"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.structure ? true : false}
                  helperText={errors.structure?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="notional"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Nocional"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.notional ? true : false}
                  helperText={errors.notional?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="currency"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="currency"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.currency ? true : false}
                  helperText={errors.currency?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="rateType"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="rateType"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.rateType ? true : false}
                  helperText={errors.rateType?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Controller
              name="status"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Estado"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  fullWidth
                  variant="standard"
                  defaultValue={""}
                  {...field}
                  error={errors.status ? true : false}
                  helperText={errors.status?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Controller
              name="costFund"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <CustomTextField
                  label="Costo de fondo"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // disabled
                  fullWidth
                  variant="outlined"
                  defaultValue={""}
                  {...field}
                  error={errors.costFound ? true : false}
                  helperText={errors.costFound?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Grid container spacing={0}>
          <Grid item lg={12} md={12} sm={12}>
            <Box
              display="flex"
              sx={{
                mt: 2,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                variant={disabled ? "contained" : "outlined"}
                size={matchDownXL ? "small":"large"}
                disabled={disabled}
                sx={{
                  mr: 1,
                  width: "100%",
                  height: matchDownXL ? "33px": "100%",
                }}
                onClick={handleSubmit(rejectQuote)}
              >
                <Typography
                  variant={matchDownXL ? "textButtonSmall" : "textButton"}
                  color={disabled ? "#56504C" : "#EC7000"}
                >
                  Rechazar
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <Box
              display="flex"
              sx={{
                mt: 2,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                disabled={disabled}
                size={matchDownXL ? "small":"large"}
                sx={{
                  mr: 1,
                  width: "100%",
                  height: matchDownXL ? "33px": "100%",
                  backgroundColor: "#003767",
                }}
                onClick={handleSubmit(approveQuote)}
              >
                <Typography
                  variant={matchDownXL ? "textButtonSmall" : "textButton"}
                  color={disabled ? "#56504C" : "#FFFFFF"}
                >
                  Autorizar
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default DetailsForm;

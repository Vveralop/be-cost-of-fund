import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Button, Typography, useMediaQuery } from "@mui/material";
import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";
//
import formatNumberTable from "./utils-form/formatNumberTable";

const validationSchema = Yup.object().shape({
  id: Yup.string().required("Id es requerido"),
  document_number: Yup.string().required("Rut es requerido"),
  quote_executive: Yup.string().required("Ejecutivo cotizante es requerido"),
  commercial_executive: Yup.string().required(
    "Ejecutivo comercial es requerido"
  ),
  name: Yup.string().required("Nombre es requerido"),
  segment: Yup.string().required("Segmento es requerido"),
  comments: Yup.string(),
  status: Yup.string(),
  structure: Yup.string().required("Estructura es requerido"),

  notional: Yup.string().required("Nocional es requerido"),
  currency: Yup.string().required("Moneda es requerido"),

  costFund: Yup.string().required("Costo de fondo es requerido"),

  spread: Yup.string().required("Costo de fondo es requerido"),
});

const DetailsForm = (props) => {
  const { data, handleClose } = props;
  // React-hook-form
  const {
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: "",
      document_number: "",
      quote_executive: "",
      commercial_executive: "",
      name: "",
      segment: "",
      comments: "",
      structure: "",
      notional: "",
      moneda: "",
      costFund: "",
      spread: "",
    },
  });

  const theme = useTheme();
    const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    console.log("data", data);
    settingInitValues();
  }, []);

  //   console.log("errors", errors);

  const settingInitValues = () => {
    let initValues = {
      id: data.id,
      document_number: data.documentNumber,
      quote_executive: data.quotingExecutiveName,
      commercial_executive: data.assignedExecutive,
      name: data.clientName,
      segment: data.segment,
      status:
        data.status === "Pending"
          ? "Pendiente"
          : data.status === "Approved"
          ? "Aprobado"
          : data.status === "Rejected"
          ? "Rechazado"
          : data.status,
      comments: data.comments,
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
      costFund: data.pricingValue,
      spread: data.spread,
    };

    for (let key in initValues) {
      if (key == "costFund") {
        setValue(`${key}`, `${(initValues[key] * 100).toFixed(2)}%`);
      } else if (key == "spread") {
        setValue(`${key}`, `${initValues[key]}%`);
      } else {
        setValue(`${key}`, `${initValues[key]}`);
      }
    }
  };

  return (
    <Box sx={{ width: "100%", p: "24px" }}>
      <Grid container spacing={1}>
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
          <Typography variant={matchDownXL ? "titleBreadcrumb" :"h5"}>Datos cliente</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {""}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
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
        <Grid item xs={12} md={12} lg={12}>
          <Controller
            name="segment"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <CustomTextField
                label="Segmento"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                fullWidth
                variant="standard"
                defaultValue={""}
                {...field}
                error={errors.segment ? true : false}
                helperText={errors.segment?.message}
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
          <Controller
            name="commercial_executive"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <CustomTextField
                label="Ejecutivo comercial"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                fullWidth
                variant="standard"
                defaultValue={""}
                {...field}
                error={errors.commercial_executive ? true : false}
                helperText={errors.commercial_executive?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
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
          {""}
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Typography variant={matchDownXL ? "titleBreadcrumb" :"h5"}>Datos Cotización</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {""}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
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
                label="Moneda"
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
                disabled
                fullWidth
                variant="standard"
                defaultValue={""}
                {...field}
                error={errors.costFound ? true : false}
                helperText={errors.costFound?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Controller
            name="spread"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <CustomTextField
                label="Spread"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
                fullWidth
                variant="standard"
                defaultValue={""}
                {...field}
                error={errors.spread ? true : false}
                helperText={errors.spread?.message}
              />
            )}
          />
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
              variant="outlined"
              size={matchDownXL ? "small":"large"}
              sx={{
                mr: 1,
                width: "100%",
                height: matchDownXL ? "33px": "100%",
              }}
              onClick={handleClose}
            >
              <Typography  variant={matchDownXL ? "textButtonSmall" : "textButton"} color="#EC7000">
                Cerrar
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsForm;

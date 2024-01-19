import React, { useState, useEffect, useContext } from "react";
// MSAL imports
import { useMsal } from "@azure/msal-react";
//
import { checkRut,prettifyRut,formatRut } from "react-rut-formatter";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { TextField, useMediaQuery } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CostfundContext } from "../../../contexts/costfund.context";
import { Box, Grid, Button, Typography, FormHelperText } from "@mui/material";
import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";

import CustomDropdownSelect from "../../../components/forms/custom-elements/custom-dropdown-select/CustomDropdownSelect";
import { saveCfQuote } from "../../../config/api/services";
import cfQuoteAdapter from "../../../adapters/pricing/cfquote.adapter";


const verifyingRut = (value) => {
  // Return true if valid, false if not
  return isValidRut(value);
}

// Funtion validate Chilean Rut
function isValidRut(rut) {
  return checkRut(rut)
}


const validationSchema = Yup.object().shape({
  document_number_client: Yup.string()
    .required("Rut es requerido")
    .test('rut','Número de rut es inválido',verifyingRut)
    .max(25, "No debe exceder los 25 caracteres."),
  quote_executive: Yup.string()
    .required("Ejecutivo cotizante es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  commercial_executive: Yup.string()
    .required("Ejecutivo comercial es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  name_client: Yup.string()
    .required("Nombre es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  segment: Yup.string()
    .required("Segmento es requerido")
    .max(50, "No debe exceder los 50 caracteres."),
  comments: Yup.string().max(300, "No debe exceder los 300 caracteres."),
});




const RequestQuoteForm = (props) => {
  const { handleCloseDialog, handleOpenExeption, setExceptionValues } = props;
  const { instrument, pricingResult } = useContext(CostfundContext);
  const [quoteExecutiveId, setQuoteExecutiveId] = useState("");
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  // React-hook-form
  const {
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      document_number_client: "12.345.678-k",
      quote_executive: "",
      commercial_executive: "Sabrina Figueroa",
      name_client: "Dummy SPA",
      segment: "",
      comments: "",
    },
  });

  /**
   * useMsal is a hook that returns the PublicClientApplication instance.
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  console.log("activeAccount", activeAccount);
  const segments = [
    { label: "Mayorista", value: "Mayorista" },
    { label: "Minorista", value: "Minorista" },
  ];

  useEffect(() => {
    if (activeAccount) {
      let executeId = activeAccount.username;
      executeId = executeId.split("@")[0];
      setQuoteExecutiveId(executeId);
      setValue("quote_executive", activeAccount.name);
    }
  }, []);

  const handleSegmentsChange = (option) => {
    console.log("segment", option);
    if (option.value && option.value !== "") {
      clearErrors(["segment"]);
      setValue("segment", option.value);
    }
  };

  const onSaveCfQuote = async (data) => {
    console.log("data", data);
    const details = data;
    // add quote_executiveId from ActiveAccount
    Object.assign(details, { quote_executiveId: quoteExecutiveId });

    const cfQuoteRequest = cfQuoteAdapter(details, instrument, pricingResult);
    try {
      const result = await saveCfQuote(cfQuoteRequest);
      console.log("RESULT_SAVING_CFQUOTE", result);
      setExceptionValues({
        exceptionType: "success",
        exceptionMessage: "Guardaste y enviaste tu cotización con éxito",
        exeptionSecondMessage:
          "Revisa esta y todas las anteriores en la categoría Mis cotizaciones.",
        exeptionTextButton: "cerrar",
      });
      handleCloseDialog();
      handleOpenExeption();
    } catch (error) {
      console.log("cfquote ", error);
      setExceptionValues({
        exceptionType: "",
        exceptionMessage: "Lo sentimos, no pudimos guardar tu cotización",
        exeptionSecondMessage:
          "Estamos trabajando para solucionar el inconveniente. Por favor inténtalo más tarde.",
        exeptionTextButton: "cerrar",
      });
      handleCloseDialog();
      handleOpenExeption();
    }
  };

  console.log("errors", errors);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          {/* <CustomFormLabel>Rut</CustomFormLabel> */}
          <Controller
            name="document_number_client"
            control={control}
            defaultValue={""}
            // render={({ field }) => (
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextField
                id="document_number_client"
                size="small"
                type="text"
                // {...field}
                variant="outlined"
                label="RUT cliente cotizante *"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                onBlur={(e) => {
                  const rutFormatted = prettifyRut(e.target.value);
                  // field.onBlur(rutFormatted)
                  if (rutFormatted < 0) {
                    onChange("");
                  } else {
                    onChange(rutFormatted);
                  }

                  onBlur();
                }}
                error={errors.document_number_client ? true : false}
                helperText={errors.document_number_client?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {/* <CustomFormLabel>Nombre</CustomFormLabel> */}
          <Controller
            name="quote_executive"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <CustomTextField
                id="quote_executive"
                size="small"
                type="text"
                variant="outlined"
                label="Ejecutivo cotizante (opcional)"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...field}
                // disabled
                error={errors.quote_executive ? true : false}
                helperText={errors.quote_executive?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {/* <CustomFormLabel>Ejecutivo cotizante</CustomFormLabel> */}
          <Controller
            name="name_client"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <CustomTextField
                id="name_client"
                size="small"
                type="text"
                variant="outlined"
                label="Nombre cliente cotizante *"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...field}
                // disabled
                error={errors.name_client ? true : false}
                helperText={errors.name_client?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          {/* <CustomFormLabel>Ejecutivo comercial</CustomFormLabel> */}
          <Controller
            name="commercial_executive"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <CustomTextField
                id="commercial_executive"
                size="small"
                type="text"
                variant="outlined"
                label="Ejecutivo comercial"
                InputLabelProps={{ shrink: true }}
                fullWidth
                {...field}
                // disabled
                error={errors.commercial_executive ? true : false}
                helperText={errors.commercial_executive?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {/* <CustomFormLabel>Segmento</CustomFormLabel> */}
          <CustomDropdownSelect
            customLabel={"Segmento"}
            options={segments.map((el) => {
              return {
                label: el.label,
                value: el.value,
              };
            })}
            optionSelected={watch("segment")}
            onSelect={handleSegmentsChange}
            small={true}
          />
          {errors.segment?.message && (
            <FormHelperText error id="standart-select-of-segment">
              {errors.segment.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {/* <CustomFormLabel>Comentarios</CustomFormLabel> */}
          <Controller
            name="comments"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextField
                id="field-comment-multiline"
                label="Mensaje (opcional)"
                fullWidth
                multiline
                rows={2}
                {...field}
                error={errors.comments ? true : false}
                helperText={errors.comments?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12}>
          <Box
            display="flex"
            sx={{ mt: 2, flexDirection: "row", justifyContent: "flex-end" }}
          >
            {/* Custom-itau-button-secondary */}
            <div style={{ margin: "0px 8px" }}>
              <div
                style={{
                  borderRadius: "8px",
                  color: "#EC7000",
                  border: "2px solid #EC7000",
                  padding: "4px 8px",
                  cursor: "pointer",
                  height: "46px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  ...(matchDownXL && {
                    height: "34px",
                  }),
                }}
                onClick={handleCloseDialog}
              >
                <div>
                  <Typography
                    variant={matchDownXL ? "textButtonSmall" : "textButton"}
                  >
                    {" "}
                    Cancelar
                  </Typography>
                </div>
              </div>
            </div>
            <div style={{ margin: "0px 8px" }}>
              <Button
                variant="contained"
                size={matchDownXL ? "small" : "large"}
                sx={{
                  backgroundColor: "#003767",
                  borderRadius: "8px",
                  height: matchDownXL ? "33px" : "100%",
                }}
                onClick={handleSubmit(onSaveCfQuote)}
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

export default RequestQuoteForm;

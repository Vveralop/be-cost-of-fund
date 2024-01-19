import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { NumericFormat } from "react-number-format";
import { CostfundContext } from "../../../contexts/costfund.context";
// Material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Grid,
  InputAdornment,
  Typography,
  FormHelperText,
  OutlinedInput,
  Portal,
  useMediaQuery,
} from "@mui/material";

import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RequestQuoteForm from "./RequestForm";
import SimulateQuoteForm from "./SimulateForm";
import parseFrecuencyPayment from "../../../utils/parseFrecuencyPayments";
import stringParseFrecuencyPayment from "../../../utils/stringParseFrecuencyPayment";
import pricingAdapter from "../../../adapters/pricing/pricing.adapter";
import ValidationFieldForm from "./utils-form/ValidationFields.form";
import CustomException from "../exceptions/CustomException";
import ExceptionDialog from "../../../components/dialogs/ExceptionDialog";
import CustomButton from "./components/CustomButton";
import CustomUploadButton from "./components/CustomUploadButton";
import UploadForm from "./UploadForm";
import calculatorSchema from "./schemas/calculator.schema";
import ItauCustomModal from "../../../components/modal/ItauCustomModal";
import CustomDropdownSelect from "../../../components/forms/custom-elements/custom-dropdown-select/CustomDropdownSelect";
import { calculatePricing } from "../../../config/api/services";
import CustomTextTooltip from "../../../components/tooltip/CustomTextTooltip";
import SimulateModal from "../components/modal/simulateModal/SimulateModal";
import LoadingModal from "../components/modal/loadingModal/LoadingModal";

const CalculatorForm = () => {
  const {
    costfundParameters,
    quoteParameters,
    setQuoteParameters,
    cashflows,
    setCashflows,
    setInstrument,
    setPricingResult,
  } = useContext(CostfundContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  const [loading, setLoading] = useState(false);
  const [frecuencyPayments, setFrecuencyPayments] = useState([]);
  const [forecastCurves, setForecastCurves] = useState([]);
  const [isStructureIrregular, setIsStructureIrregular] = useState(false);
  const [frecuencyByIndex, setFrecuencyByIndex] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogExeption, setOpenDialogExeption] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogSubTitle, setDialogSubTitle] = useState("");
  const [dialogAction, setDialogAction] = useState("");
  const [isFieldRequired, setIsFieldRequired] = useState(true);
  const [uploadedRequired, setUploadedRequired] = useState(false);
  const [exceptionValues, setExceptionValues] = useState({
    exceptionType: "",
    exceptionMessage: "",
    exeptionSecondMessage: "",
    exeptionTextButton: "",
  });

  const {
    exceptionType,
    exceptionMessage,
    exeptionSecondMessage,
    exeptionTextButton,
  } = exceptionValues;

  // React-hook-form
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
    watch,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(calculatorSchema(isFieldRequired)),
    mode: "onChage",
  });

  useEffect(() => {
    if (cashflows.length > 0) {
      setUploadedRequired(false);
    }
  }, [cashflows]);

  useEffect(() => {
    handleFormValues();
  }, [costfundParameters]);

  useEffect(() => {
    if (frecuencyByIndex !== "") {
      let f_payment = forecastCurves.filter(
        (item) => item.curveName == frecuencyByIndex
      );
      f_payment = f_payment[0]?.fixingFrequency;
      setValue("frecuency_payment", stringParseFrecuencyPayment(f_payment));
    } else {
      setValue("frecuency_payment", "");
    }
  }, [frecuencyByIndex]);

  // handle Hidden Fields
  const handleHiddenFields = (startDate, endDate) => {
    setValue("frecuency_payment", "OtherFrequency");
    setValue("start_tenor", startDate);
    setValue("end_tenor", endDate);
  };

  const handleOpenExeption = (type) => {
    setOpenDialogExeption(true);
  };

  const handleCloseExeption = () => {
    setExceptionValues({
      exceptionType: "",
      exceptionMessage: "",
      exeptionSecondMessage: "",
      exeptionTextButton: "",
    });
    setOpenDialogExeption(false);
  };

  const handleClickOpenDialog = (info, act) => {
    let dialogName =
      act === "quote"
        ? "Resultado de tu simulación"
        : act === "upload"
        ? "Perfil de pagos"
        : "";
    let dialogSubName =
      act === "quote"
        ? "Para obtener nuevas opciones sólo vuelve a simular."
        : act === "upload"
        ? "Ingresa la tabla de pagos del crédito que quieres cotizar"
        : "";
    let actionName =
      act === "quote" ? "simulate" : act === "upload" ? "upload" : "save";

    setDialogTitle(dialogName);
    setDialogSubTitle(dialogSubName);
    setDialogAction(actionName);
    setOpenDialog(true);
  };

  const handleClickCloseDialog = (act) => {
    setOpenDialog(false);
    if (act === "save") {
      setTimeout(() => {
        setDialogTitle("Ingresa la cotización");
        setDialogSubTitle("Completa los datos del cliente para continuar.");
        setDialogAction("save");
        setOpenDialog(true);
      }, 400);
    } else {
      setDialogTitle("");
      setDialogSubTitle("");
      setDialogAction("");
    }
  };

  const handleFormValues = () => {
    if (costfundParameters?.paymentFrequencies.length > 0) {
      // Mappind paymentFrequencies array for select list
      let paymentFrecuencyMapped = costfundParameters?.paymentFrequencies;
      paymentFrecuencyMapped = paymentFrecuencyMapped.map((item) => {
        return parseFrecuencyPayment(item);
      });

      // For custom dropdown select
      paymentFrecuencyMapped = paymentFrecuencyMapped.map((el) => {
        return {
          label: el.name,
          value: el.value,
        };
      });

      setFrecuencyPayments(paymentFrecuencyMapped);
    }

    if (costfundParameters?.forecastCurves.length > 0) {
      setForecastCurves(costfundParameters?.forecastCurves);
    }
    // console.log("costfundParameters", costfundParameters);

    // Verifying if the product is Irregular Structure
    if (
      costfundParameters?.structure == "CustomFloatingRate" ||
      costfundParameters?.structure == "CustomFixedRate"
    ) {
      // console.log("IS_CUSTOM_RATE");
      setIsStructureIrregular(true);
      setIsFieldRequired(false);
    } else {
      setIsStructureIrregular(false);
      setIsFieldRequired(true);
    }

    // Setting min and max values for start tenor
    localStorage.setItem(
      "minStartTenorG",
      costfundParameters ? costfundParameters.minStartTenor : ""
    );
    localStorage.setItem(
      "maxStartTenorG",
      costfundParameters ? costfundParameters.maxStartTenor : ""
    );
    localStorage.setItem(
      "maxEndTenorG",
      costfundParameters ? costfundParameters.maxEndTenor : ""
    );

    let defaultValues = {
      product_name: costfundParameters ? costfundParameters.productName : "",
      start_tenor: "",
      end_tenor: "",
      minStartTenor: costfundParameters ? costfundParameters.minStartTenor : "",
      maxStartTenor: costfundParameters ? costfundParameters.maxStartTenor : "",
      maxEndTenor: costfundParameters ? costfundParameters.maxEndTenor : "",
      minNotional: costfundParameters ? costfundParameters.minNotional : "",
      maxNotional: costfundParameters ? costfundParameters.maxNotional : "",
      structure: costfundParameters ? costfundParameters.structure : "",
      currency: costfundParameters
        ? costfundParameters.currency === "CLF"
          ? "UF"
          : costfundParameters.currency
        : "",
      curve_index: "",
      frecuency_payment: costfundParameters?.paymentFrequencies.includes(
        "OtherFrequency"
      )
        ? "Otra frecuencia"
        : "",
      rate: costfundParameters
        ? costfundParameters.rateType === "Fixed"
          ? "Fija"
          : "Flotante"
        : "",
    };

    for (let key in defaultValues) {
      setValue(`${key}`, `${defaultValues[key]}`);
    }

    setCashflows([]);
    setUploadedRequired(false);
  };

  const saveQuote = (data) => {
    setLoading(true);
    handleClickCloseDialog();

    setTimeout(() => {
      setLoading(false);
      handleOpenExeption();
    }, 500);
    console.log(data);
  };

  const handleChange = (option) => {
    console.log("otherFrecuencies", option);
    if (option.value && option.value !== "") {
      clearErrors(["frecuency_payment"]);
      setValue("frecuency_payment", option.value);
    }
  };

  const handleCurveIndexChange = (option) => {
    console.log("curve_index", option);
    if (option.value && option.value !== "") {
      clearErrors(["curve_index"]);
      setValue("curve_index", option.value);
      setFrecuencyByIndex(option.value);
    }
  };

  const pricingSimulate = async (data) => {
    console.log("costfundParameters", costfundParameters);
    if (
      costfundParameters?.structure == "CustomFloatingRate" ||
      costfundParameters?.structure == "CustomFixedRate"
    ) {
      if (cashflows.length <= 0) {
        setUploadedRequired(true);
        return;
      }

      setValue("");
    } else {
      setUploadedRequired(false);
    }

    const productParameters = {
      structure: costfundParameters?.structure,
      idCategory: costfundParameters?.idCategory,
      idProduct: costfundParameters?.id,
      discountCurve: costfundParameters?.discountCurve,
      rateType: costfundParameters?.rateType,
      forecastCurves: costfundParameters?.forecastCurves,
      paymentFrequencies: costfundParameters?.paymentFrequencies,
      rateObject: costfundParameters?.rate,
      allowMultipleDisbursements:
        costfundParameters?.allowMultipleDisbursements,
      cashflows: null,
    };

    // add the form data to product data object.
    Object.assign(productParameters, data);

    // if (
    //   costfundParameters?.structure == "CustomFloatingRate" ||
    //   costfundParameters?.structure == "CustomFixedRate"
    // ) {
    //   Object.assign(productParameters, { notional: quoteParameters.notional });
    // }
    Object.assign(productParameters, { cashflows: cashflows });

    setLoading(true);
    try {
      // Adapting data request
      // console.log("productParameters", productParameters);
      let pricingRequest = pricingAdapter(productParameters);
      // console.log("pricingRequest", pricingRequest);
      // 2 - Calculate quote price...
      let result = await calculatePricing(pricingRequest);
      // console.log("result_pricing", result);
      if (result.statusCode === 200) {
        result = result?.data;
        // 1 - Set quote info and result pricing to context...

        const costfundValue = result.parRate.value
          ? parseFloat(result.parRate.value)
          : 0;

        const durationValue = result.sensitivity
          ? // Duration = couponSens + spreadSenstivity
            parseFloat(
              result.sensitivity.couponSens +
                result.sensitivity.spreadSenstivity
            )
          : 0;
        setInstrument(pricingRequest);
        setPricingResult(result);
        setQuoteParameters({
          ...quoteParameters,
          product: data.product_name,
          rate: data.rate,
          currency: data.currency,
          start_date: data.start_tenor.toUpperCase(),
          end_date: data.end_tenor.toUpperCase(),
          payment_frecuency: data.frecuency_payment,
          notional: data.notional,
          cFund: costfundValue,
          duration: durationValue,
        });
      }
      setLoading(false);
      handleClickOpenDialog(null, "quote");
    } catch (error) {
      setLoading(false);
      // console.log("ERROR_PRICINGSIMULATIONS", error);
      if (error.message === "ERROR_NOTIONAL_REDEMPTIONS") {
        setError("notional", {
          type: "custom",
          message: "Nocional no coincide con el total de amortizaciones",
        });
      } else {
        // Set exception messages error
        setExceptionValues({
          exceptionType: "warning",
          exceptionMessage: "Lo sentimos, no pudimos realizar tu simulación",
          exeptionSecondMessage: "Por favor, inténtalo nuevamente.",
          exeptionTextButton: "cerrar",
        });
        handleOpenExeption();
      }
    }
  };

  let isFixed = costfundParameters?.rateType == "Fixed";

  let isOtherFrecuency =
    costfundParameters?.paymentFrequencies.includes("OtherFrequency");

  let isArrayOfFrecuencies =
    costfundParameters?.paymentFrequencies.length > 0 ? true : false;

  let isFloatingRateType =
    costfundParameters?.rateType == "Floating" ? true : false;

  // console.log("errors", errors);

  return (
    <>
      {/* <Box sx={{ p: "24px", height: "747px" }}> */}
      <Box sx={{ p: "24px", height: "90vh" }}>
        <Grid container spacing={matchDownXL ? 0 : 1}>
          <Grid item lg={12} md={12} sm={12} sx={{ mt: 1, mb: 2 }}>
            <Typography variant={matchDownXL ? "normalBold16" : "normalBold20"}>
              {costfundParameters
                ? costfundParameters.description
                : "Parámetros"}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} sx={{ width: "100%" }}>
            {/* <SimpleBar style={{ height: "540px" }}> */}
            <SimpleBar style={{ height: "65vh" }}>
              <Grid container spacing={matchDownXL ? 1 : 2}>
                {/* FORM VALIDATION FIELDS */}
                <ValidationFieldForm control={control} errors={errors} />

                {/* FORM FIELDS */}
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  sx={{ mb: matchDownXL ? 1 : 2, mt: 1 }}
                >
                  <Controller
                    name="product_name"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <CustomTextField
                        id="product_name"
                        size="small"
                        type="text"
                        variant="outlined"
                        label="Estructura"
                        fullWidth
                        {...field}
                        disabled
                        error={errors.product_name ? true : false}
                        helperText={errors.product_name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  sx={{ mt: 1, mb: matchDownXL ? 1 : 2 }}
                >
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

                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  sx={{ mt: 1, mb: matchDownXL ? 1 : 2 }}
                >
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
                {/* BULLET-IREGULAR - FLOATING */}
                {isFloatingRateType ? (
                  <Grid item lg={6} md={12} sm={12} sx={{ mt: 1, mb: 1 }}>
                    <CustomDropdownSelect
                      customLabel={"Indice"}
                      options={forecastCurves.map((el) => {
                        return {
                          label: el.curveName,
                          value: el.curveName,
                        };
                      })}
                      optionSelected={watch("curve_index")}
                      onSelect={handleCurveIndexChange}
                      small={true}
                    />
                    {errors.curve_index?.message && (
                      <FormHelperText error id="standart-select-of-curve_index">
                        {errors.curve_index.message}
                      </FormHelperText>
                    )}
                  </Grid>
                ) : null}

                {isFloatingRateType ? (
                  <Grid item lg={6} md={12} sm={12} sx={{ mt: 1, mb: 1 }}>
                    <Controller
                      name="frecuency_payment"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <CustomTextField
                          id="frecuency_payment"
                          size="small"
                          type="text"
                          variant="outlined"
                          label="Frecuencia de pago"
                          fullWidth
                          {...field}
                          disabled
                          error={errors.frecuency_payment ? true : false}
                          helperText={errors.frecuency_payment?.message}
                        />
                      )}
                    />
                  </Grid>
                ) : null}

                {isStructureIrregular ? null : (
                  <Grid
                    item
                    lg={6}
                    md={12}
                    sm={12}
                    sx={{ mt: matchDownXL ? 1 : 2, mb: 1 }}
                  >
                    <Controller
                      name="start_tenor"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <CustomTextTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">
                                Plazo desembolso:
                              </Typography>
                              {
                                "En este campo puedes ingresar fechas bajo el siguiente formato"
                              }
                              . <b>Y</b>
                              <em>{" para años,"}</em> <b>M</b>
                              <em>{" para meses,"}</em> <b>W</b>
                              <em>{" para semanas,"}</em> <b>D</b>
                              <em>{" para dias,"}</em> {"ejemplos:"}{" "}
                              <b>{"1Y2M15D ,3M15D, 9M, 20D..."}</b>
                            </React.Fragment>
                          }
                        >
                          <CustomTextField
                            id="start_tenor"
                            size="small"
                            type="text"
                            variant="outlined"
                            autoComplete="off"
                            label="Plazo desembolso"
                            fullWidth
                            {...field}
                            error={errors.start_tenor ? true : false}
                            helperText={errors.start_tenor?.message}
                          />
                        </CustomTextTooltip>
                      )}
                    />
                  </Grid>
                )}

                {(isFixed && isOtherFrecuency) ||
                isStructureIrregular ? null : (
                  <Grid
                    item
                    lg={6}
                    md={12}
                    sm={12}
                    sx={{ mt: matchDownXL ? 1 : 2, mb: 1 }}
                  >
                    <Controller
                      name="end_tenor"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <CustomTextTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">
                                "Plazo vencimiento":
                              </Typography>
                              {
                                "En este campo puedes ingresar fechas bajo el siguiente formato"
                              }
                              . <b>Y</b>
                              <em>{" para años,"}</em> <b>M</b>
                              <em>{" para meses,"}</em> <b>W</b>
                              <em>{" para semanas,"}</em> <b>D</b>
                              <em>{" para dias,"}</em> {"ejemplos:"}{" "}
                              <b>{"1Y2M15D ,3M15D, 9M, 20D..."}</b>
                            </React.Fragment>
                          }
                        >
                          <CustomTextField
                            id="end_tenor"
                            size="small"
                            type="text"
                            variant="outlined"
                            autoComplete="off"
                            label="Plazo vencimiento"
                            fullWidth
                            {...field}
                            error={errors.end_tenor ? true : false}
                            helperText={errors.end_tenor?.message}
                          />
                        </CustomTextTooltip>
                      )}
                    />
                  </Grid>
                )}

                {isStructureIrregular || isFloatingRateType ? null : (
                  <Grid
                    item
                    lg={isFixed && isOtherFrecuency ? 6 : 12}
                    md={12}
                    sm={12}
                    sx={{ mt: matchDownXL ? 1 : 2, mb: 1 }}
                  >
                    {isArrayOfFrecuencies ? (
                      <>
                        <CustomDropdownSelect
                          customLabel={"Frecuencia de pago"}
                          options={frecuencyPayments}
                          optionSelected={watch("frecuency_payment")}
                          onSelect={handleChange}
                          small={true}
                        />

                        {errors.frecuency_payment?.message && (
                          <FormHelperText
                            error
                            id="standart-select-of-payment-frecuency"
                          >
                            {errors.frecuency_payment.message}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <Controller
                        name="frecuency_payment"
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                          <CustomTextField
                            id="frecuency_payment"
                            size="small"
                            type="text"
                            variant="outlined"
                            fullWidth
                            label="Frecuencia de pago"
                            {...field}
                            disabled
                            error={errors.frecuency_payment ? true : false}
                            helperText={errors.frecuency_payment?.message}
                          />
                        )}
                      />
                    )}
                  </Grid>
                )}
                {/* Add payment profile */}
                {(isFixed && isOtherFrecuency) || isStructureIrregular ? (
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    sx={{ mt: matchDownXL ? 1 : 2, mb: 1 }}
                  >
                    <div
                      onClick={() => {
                        handleClickOpenDialog(null, "upload");
                      }}
                    >
                      <CustomUploadButton required={uploadedRequired} />
                    </div>
                  </Grid>
                ) : null}

                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  sx={{ mt: matchDownXL ? 1 : 2, mb: 1 }}
                >
                  <Controller
                    name="spread"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <CustomTextField
                        id="spread"
                        size="small"
                        type="number"
                        variant="outlined"
                        label="Spread comercial"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {"%"}
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        {...field}
                        error={errors.spread ? true : false}
                        helperText={errors.spread?.message}
                      />
                    )}
                  />
                </Grid>
                {costfundParameters?.structure == "CustomFloatingRate" ||
                costfundParameters?.structure == "CustomFixedRate" ? null : (
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    sx={{ mt: matchDownXL ? 1 : 2, mb: 1 }}
                  >
                    <Controller
                      name="notional"
                      control={control}
                      defaultValue={""}
                      render={({ field }) => (
                        <NumericFormat
                          id="notional"
                          type="text"
                          name="notional"
                          {...field}
                          placeholder="Nocional"
                          fullWidth
                          error={errors.notional ? true : false}
                          decimalScale={0}
                          allowNegative={false}
                          prefix={
                            costfundParameters
                              ? costfundParameters.currency === "CLF"
                                ? "UF "
                                : costfundParameters.currency === "CLP"
                                ? "CLP "
                                : costfundParameters.currency === "USD"
                                ? "USD "
                                : ""
                              : ""
                          }
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          customInput={OutlinedInput}
                        />
                      )}
                    />
                    {errors.notional?.message && (
                      <FormHelperText
                        error
                        id="standart-select-of-payment-frecuency"
                      >
                        {errors.notional.message}
                      </FormHelperText>
                    )}
                  </Grid>
                )}
              </Grid>
            </SimpleBar>

            <Grid item lg={12} md={12} sm={12}>
              <Box
                display="flex"
                sx={{
                  mt: matchDownXL ? 2 : 8,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <CustomButton
                  textButton="Simular"
                  valid={isValid}
                  loading={loading}
                  handleClick={handleSubmit(pricingSimulate)}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <ExceptionDialog
        loading={loading}
        onClose={handleCloseExeption}
        open={openDialogExeption}
      >
        {/* Success exeption */}
        <CustomException
          type={exceptionType}
          mainMessage={exceptionMessage}
          secondaryMessage={exeptionSecondMessage}
          textButtonAction={exeptionTextButton}
          handleAction={handleCloseExeption}
        />
      </ExceptionDialog>
      {loading && (
          <LoadingModal
          open={loading}
         />
        )}
      <Portal>
      
        {dialogAction === "save" ? (
          <ItauCustomModal
            open={openDialog}
            dialogTitle={dialogTitle}
            dialogSubTitle={dialogSubTitle}
            onClose={handleClickCloseDialog}
          >
            <RequestQuoteForm
              handleCloseDialog={handleClickCloseDialog}
              handleOpenExeption={handleOpenExeption}
              setExceptionValues={setExceptionValues}
              saveQuote={saveQuote}
            />
          </ItauCustomModal>
        ) : dialogAction === "upload" ? (
          <ItauCustomModal
            open={openDialog}
            dialogTitle={dialogTitle}
            dialogSubTitle={dialogSubTitle}
            onClose={handleClickCloseDialog}
          >
            <UploadForm
              setValue={setValue}
              handleCloseDialog={handleClickCloseDialog}
              handleHiddenFields={handleHiddenFields}
            />
          </ItauCustomModal>
        ) : (
          <SimulateModal
            open={openDialog}
            dialogTitle={dialogTitle}
            dialogSubTitle={dialogSubTitle}
            onClose={handleClickCloseDialog}
          >
            <SimulateQuoteForm
              handleCloseDialog={handleClickCloseDialog}
              setExceptionValues={setExceptionValues}
            />
          </SimulateModal>
        )}
      </Portal>
    </>
  );
};

export default CalculatorForm;

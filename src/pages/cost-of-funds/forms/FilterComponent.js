import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, Typography,useMediaQuery } from "@mui/material";
import CustomDropdownSelect from "../../../components/forms/custom-elements/custom-dropdown-select/CustomDropdownSelect";
import { fetchGetProducts } from "../../../store/reducers/thunks/costfund";
import { CostfundContext } from "../../../contexts/costfund.context";

// Redux states...
const selectProducts = (state) => state.costfund;

const FilterComponent = () => {
  const dispatch = useDispatch();
  const { _products, status } = useSelector(selectProducts);
  const {
    productIndex,
    rateIndex,
    structureIndex,
    currencyIndex,
    setProductIndex,
    setProductOptionsArray,
    rateValues,
    structureValues,
    currencyValues,
    setRateIndex,
    setStructureIndex,
    setCurrencyIndex,
    cleaningIndex,
  } = useContext(CostfundContext);
  const [rateKey, setRateKey] = useState("");
  const [structureKey, setStructureKey] = useState("");
  const [currencyKey, setCurrencyKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const filterButtonState =
    productIndex &&
    (currencyKey !== "" || rateKey !== "" || structureKey !== "");
    const theme = useTheme();
    const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));


  // console.log(filterButtonState);
  useEffect(() => {
    // Setting filters
    // if (filterButtonState) {
    // if (productIndex !== null) {
    //   setDisabled(false);
    // }
    handleCleanFilter();
    settingsFilterArrays();
  }, [productIndex]);

  const settingsFilterArrays = () => {
    let productOptions =
      productIndex !== null
        ? _products.filter((item) => item.id == productIndex)[0]?.options
        : [];

    setProductOptionsArray(productOptions);
  };

  const handleClickFilter = () => {
    setRateIndex(rateKey);
    setStructureIndex(structureKey);
    setCurrencyIndex(currencyKey);
  };

  const handleCleanFilter = () => {
    
    cleaningIndex();
    setRateKey("");
    setStructureKey("");
    setCurrencyKey("");
  };

  return (
    <div
      style={{
        display: "flex",
        // flexWrap:"wrap",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <div style={{ width: "100%", margin: matchDownXL ? "4px" : "8px" }}>
        <CustomDropdownSelect
          customLabel={"Familia de producto"}
          small={matchDownXL ? true : false}
          options={_products.map((el) => {
            return {
              label: el.category,
              value: el.id,
            };
          })}
          onSelect={(option) => {
            console.log("option", option.value);
            setProductIndex(option.value);
          }}
        />
      </div>
      <div style={{ width: "100%", margin: matchDownXL ? "4px" : "8px"  }}>
        <CustomDropdownSelect
          customLabel={"Tasa"}
          small={matchDownXL ? true : false}
          options={rateValues.map((el) => {
            let label =
              el === "Fixed" ? "Fija" : el === "Floating" ? "Flotante" : el;
            let value = label === "Tasa" ? "" : el;

            return {
              label: label,
              value: value,
            };
          })}
          onSelect={(option) => {
            console.log("option", option.value);
            setRateKey(option.value);
          }}
        />
      </div>
      <div style={{ width: "100%", margin: matchDownXL ? "4px" : "8px"  }}>
        <CustomDropdownSelect
          customLabel={"Estructura"}
          small={matchDownXL ? true : false}
          options={structureValues.map((el) => {
            let value = el === "Estructura" ? "" : el;

            let label =
              value === "FixedRateCustom"
                ? "Pagos irregulares fija"
                : value === "CustomFixedRate"
                ? "Pagos irregulares fija"
                : value === "CustomFloatingRate"
                ? "Pagos irregulares flotante"
                : value === "FixedRateBullet"
                ? "Bullet fijo"
                : value === "FloatingRateBullet"
                ? "Bullet flotante"
                : value === "EqualPayment"
                ? "Pagos iguales"
                : value === "ZeroCouponFixedRate"
                ? "Cero fijo"
                : value === "ZeroCouponFloatingRate"
                ? "Cero flotante"
                : value === "FixedRateEqualRedemption"
                ? "Amortizaciones iguales fija"
                : value === "FloatingRateEqualRedemption"
                ? "Amortizaciones iguales flotante"
                : value === ""
                ? "Estructura"
                : value;

            return {
              label: label,
              value: value,
            };
          })}
          onSelect={(option) => {
            console.log("option", option.value);
            setStructureKey(option.value);
          }}
        />
      </div>
      <div style={{ width: "100%", margin: matchDownXL ? "4px" : "8px"  }}>
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
            setCurrencyKey(option.value);
          }}
        />
      </div>
      <div style={{ width: "100%", margin: matchDownXL ? "4px" : "8px"  }}>
        <Box
          display="flex"
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size={matchDownXL ? "small":"large"}
            variant="contained"
            disabled={!filterButtonState}
            // disabled={disabled}
            sx={{
              mr: 1,
              width: "100%",
              height: matchDownXL ? "33px": "100%",
              backgroundColor: "#003767",
            }}
            onClick={handleClickFilter}
          >
            <Typography
              variant={matchDownXL ? "textButtonSmall" : "textButton"}
              color={!filterButtonState ? "#56504C" : "#FFFFFF"}
            >
              Filtrar
            </Typography>
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default FilterComponent;

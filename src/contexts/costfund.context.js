import { createContext, useState, useEffect } from "react";
import { uniqueKeyValues } from "../utils/uniqueKeyValues";

export const CostfundContext = createContext();

const CostfundContextProvider = ({ children }) => {
  const [productOptionsArray, setProductOptionsArray] = useState([]);
  const [productIndex, setProductIndex] = useState(null);
  const [rateValues, setRateValues] = useState([]);
  const [structureValues, setStructureValues] = useState([]);
  const [currencyValues, setCurrencyValues] = useState([]);
  const [rateIndex, setRateIndex] = useState("");
  const [structureIndex, setStructureIndex] = useState("");
  const [currencyIndex, setCurrencyIndex] = useState("");
  const [costfundParameters, setCostfundParameters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cashflows, setCashflows] = useState([]);
  const [filterRate, setFilterRate] = useState("");
  const [filterCurrency, setFilterCurrency] = useState("");
  const [instrument, setInstrument] = useState(null);
  const [pricingResult, setPricingResult] = useState(null);
  const [quoteParameters, setQuoteParameters] = useState({
    product: "",
    rate: "",
    currency: "",
    start_date: "",
    payment_frecuency: "",
    notional: "",
    cFund: "",
    duration: "",
  });
  

  useEffect(() => {
    if (productOptionsArray.length > 0) {
      settingFilterValues();
    }
  }, [productOptionsArray]);

  const getDataPricing = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const settingFilterValues = () => {
    let rates = uniqueKeyValues(productOptionsArray, "rateType");
    let structures = uniqueKeyValues(productOptionsArray, "structure");
    let currencies = uniqueKeyValues(productOptionsArray, "currency");

    rates = ["Tasa", ...rates];
    setRateValues(rates);
    structures = ["Estructura", ...structures];
    setStructureValues(structures);
    currencies = ["Moneda", ...currencies];
    setCurrencyValues(currencies);
  };

  const handleProductArray = (data) => {
    setProductOptionsArray(data);
  };

  const cleaningIndex = () => {
      setRateIndex("");
      setStructureIndex("");
      setCurrencyIndex("");
  };

  return (
    <CostfundContext.Provider
      value={{
        costfundParameters,
        setCostfundParameters,
        getDataPricing,
        quoteParameters,
        setQuoteParameters,
        loading,
        cashflows,
        setCashflows,
        filterRate,
        setFilterRate,
        filterCurrency,
        setFilterCurrency,
        instrument,
        setInstrument,
        pricingResult,
        setPricingResult,
        productOptionsArray,
        setProductOptionsArray,
        productIndex,
        setProductIndex,
        handleProductArray,
        rateValues,
        structureValues,
        currencyValues,
        rateIndex,
        setRateIndex,
        structureIndex,
        setStructureIndex,
        currencyIndex,
        setCurrencyIndex,
        cleaningIndex
      }}
    >
      {children}
    </CostfundContext.Provider>
  );
};

export default CostfundContextProvider;

export default function cfQuoteListAdapter(data, handlerFunction) {
  const dataIn = data;
//   console.log("dataIn", data);

  const dataOut = dataIn.map((el) => {
    const infoAdapted = {
      id: el.id,
      idProduct: el.idProduct,
      idCategory: el.idCategory,
      category: el.category,
      clientName: el?.quoteDetails?.name,
      documentNumber: el?.quoteDetails?.rut,
      comments: el?.quoteDetails?.comment,
      segment: el?.quoteDetails?.segment,
      quotingExecutive: el?.quoteDetails?.quoteUser,
      quotingExecutiveName: el?.quoteDetails?.quoteUserName,
      assignedExecutive: el?.quoteDetails?.clientAssingedUser,
      structure: el?.instrument?.structure,
      rateType: el?.instrument?.rateType,
      status: el?.quote?.status,
      validUntil: el?.quote?.validUntil,
      sensitivity: el?.pricing?.sensitivity,
      pricingRefDate: el?.pricing?.refDate,
      pricingType: el?.pricing?.parRate?.type,
      pricingValue: el?.pricing?.parRate?.value,
      pricingForecastCurve: el?.pricing?.parRate?.forecastCurve,
      productName: el.productName,
      currency: el?.instrument?.currency,
      notional: el?.instrument?.notional,
      spread: el?.instrument?.creditSpread,
    };

    const handlers ={
        handler: handlerFunction,
      }

      Object.assign(infoAdapted,handlers);


    return infoAdapted;
  });

//   console.log("dataOut", dataOut);

  return dataOut;
}

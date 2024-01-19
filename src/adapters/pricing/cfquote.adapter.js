export default function cfQuoteAdapter(details, instrument, pricing) {
  // console.log("details", details);
  // console.log("instrument", instrument);
  // console.log("pricing", pricing);
  const detailsData = details;
  const instrumentData = instrument;
  const pricingData = pricing;

  const request = {
    idCategory: instrumentData.idCategory,
    idProduct: instrumentData.idProduct,
    quote: {
      status: pricingData.status,
      comment: "",
      validUntil: "",
      approvedBy: "",
      reasons: pricingData.reasons,
    },
    quoteDetails: {
      clientAssingedUser: detailsData.commercial_executive,
      quoteUser: detailsData.quote_executiveId,
      quoteUserName: detailsData.quote_executive,
      rut: detailsData.document_number_client,
      name: detailsData.name_client,
      segment: detailsData.segment,
      comment: detailsData.comments,
    },
    instrument: {
      source: "cf",
      side: "Receive",
      structure: instrumentData.structure,
      startTenor: instrumentData.startTenor,
      endTenor: instrumentData.endTenor,
      discountCurve: instrumentData.discountCurve,
      creditSpread: Number(instrumentData.creditSpread),
      currency: instrumentData.currency,
      notional: instrumentData.notional,
      paymentFrequency: instrumentData.paymentFrequency,
      rateType: instrumentData.rateType,
      rate: instrumentData.rate,
      forecastCurve: instrumentData.forecastCurve,
      allowMultipleDisbursements: instrumentData.allowMultipleDisbursements,
      cashflows: instrumentData.cashflows,
    },
  };

  if (pricingData.parRate?.forecastCurve === null) {
    Object.assign(pricingData.parRate, { forecastCurve: "" });
  }

  delete pricingData.status;
  delete pricingData.reasons;

  Object.assign(request, { pricing: pricingData });

  return request;
}

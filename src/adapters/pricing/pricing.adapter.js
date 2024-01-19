import removeDotsAndCommas from "../../utils/removeDotsAndCommas";

//------- PRICING ------ //
export default function pricingAdapter(data) {
  // 1 - FixedRateCustom - structure request schema
  // 2 - FloatingRateBullet - structure request schema - Floating
  // 3 - FixedRateBullet - structure request schema

  // console.log("data", data);

  let _infoRequest = data;
  let forecastCurve = {};
  let floatFrecuencyPayment = "";

  // Parsing Notional
  let unformattedNotional;

  console.log(_infoRequest.notional.split(" "));
  let notionalFormatted =
    _infoRequest.notional.split(" ").length > 1
      ? _infoRequest.notional.split(" ")[1]
      : _infoRequest.notional.split(" ")[0];
  unformattedNotional = notionalFormatted
    ? removeDotsAndCommas(notionalFormatted)
    : null;

  console.log(unformattedNotional);

  // Config forcastCurve
  const forecastCurves = _infoRequest?.forecastCurves;

  if (_infoRequest?.rateType == "Floating") {
    forecastCurve = forecastCurves.filter(
      (item) => item.curveName == _infoRequest.curve_index
    )[0];
    floatFrecuencyPayment = _infoRequest.paymentFrequencies
      ? _infoRequest?.paymentFrequencies[0]
      : "";
  }

  let requestSchema = {
    source: "cf",
    side: "Receive",
    refDate: "",
    structure: _infoRequest?.structure,
    idCategory: _infoRequest?.idCategory,
    idProduct: _infoRequest?.idProduct,
    startTenor: _infoRequest?.start_tenor,
    endTenor: _infoRequest?.end_tenor,
    discountCurve: _infoRequest?.discountCurve,
    creditSpread: Number(_infoRequest?.spread),
    currency: _infoRequest?.currency
      ? _infoRequest.currency === "UF"
        ? "CLF"
        : _infoRequest.currency
      : "",
    notional: unformattedNotional,
    paymentFrequency:
      _infoRequest?.rateType == "Floating"
        ? forecastCurve?.fixingFrequency
        : // ? floatFrecuencyPayment
          _infoRequest?.frecuency_payment,
    rateType: _infoRequest?.rateType,
    rate: _infoRequest?.rateObject ? _infoRequest.rateObject : {},
    forecastCurve: forecastCurve,
    allowMultipleDisbursements: _infoRequest.allowMultipleDisbursements
      ? _infoRequest.allowMultipleDisbursements
      : false, // depends
    cashflows: _infoRequest.cashflows ? _infoRequest.cashflows : [],
  };

  let redemptionCounter = [];
  if (requestSchema.cashflows.length > 0) {
    const cashflowsArray = requestSchema.cashflows;
    cashflowsArray.forEach((element) => {
      redemptionCounter.push(element.redemption);
    });
    redemptionCounter = redemptionCounter.reduce((curr, acc) => curr + acc, 0);
    // console.log("redemptionCounter",redemptionCounter);
    if (redemptionCounter !== requestSchema.notional) {
      throw new Error("ERROR_NOTIONAL_REDEMPTIONS");
    }
  }

  return requestSchema;
}

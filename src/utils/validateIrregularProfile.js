import { isValid, parse, format } from "date-fns";

export function validateIrregularProfile(entries) {
  let totalDisbursement = [];
  let totalRedemption = [];

  for (const entry of entries) {
    // Validate date format
    const parsedDate = parse(entry.date, "yyyy-MM-dd", new Date());
    const isValidDateFormat = isValid(parsedDate);

    if (!isValidDateFormat) {
      // try the alternative date format
      const parsedDateAlternative = parse(entry.date, "dd/MM/yyyy", new Date());
      if (!isValid(parsedDateAlternative)) {
        return false; // Invalid date format
      }
    }

    // Additional validation for disbursement and redemption

    if (typeof entry.disbursement !== "number" || entry.disbursement < 0) {
      return false; // Invalid disbursement value
    }

    totalDisbursement.push(entry.disbursement);

    if (typeof entry.redemption !== "number" || entry.redemption < 0) {
      return false; // Invalid disbursement value
    }

    totalRedemption.push(entry.redemption);
  }

  totalDisbursement = totalDisbursement.reduce((acc, cur) => acc + cur, 0);
  totalRedemption = totalRedemption.reduce((acc, cur) => acc + cur, 0);

  console.log("totalDisbursement", totalDisbursement);
  console.log("totalRedemption", totalRedemption);
  console.log(totalDisbursement === totalRedemption);
  if (totalDisbursement === totalRedemption) {
    // All validations passed
    return true;
  } else {
    return false;
  }
}

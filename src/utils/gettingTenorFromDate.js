import {
  parse,
  format,
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
} from "date-fns";

export default function gettingTenorFromDate(inputDate) {
  let tenorDate = [];
  let counterValidate = [];

  // Get the current date
  const currentDate = new Date();

  // Parse the input date
  const parsedDate = parse(inputDate, "yyyy-MM-dd", new Date());
  const formatCurrentDate = format(currentDate, "yyyy-MM-dd");
  console.log("FormatCurrentDate", formatCurrentDate)
  console.log("inputDate", inputDate)


  if (formatCurrentDate === inputDate) {
    tenorDate = "0D";
    return tenorDate;
  }

  // Calculate the differences
  const yearsDiff = differenceInYears(parsedDate, currentDate);
  const monthsDiff = differenceInMonths(parsedDate, currentDate);
  const weeksDiff = differenceInWeeks(parsedDate, currentDate);
  const daysDiff = differenceInDays(parsedDate, currentDate);

  console.log("daysDiff",daysDiff % 7)

  // Return the differences in the desired format (YMWD);
  const differencesDate = {
    years: yearsDiff,
    months: monthsDiff % 12,
    weeks: weeksDiff % 4,
    days: (daysDiff % 7) + 1,
  };

  console.log("differencesDate", differencesDate);

  for (let key in differencesDate) {
    let value;
    if (differencesDate[key] > 0) {
      if (key === "years") {
        value = `${differencesDate[key]}Y`;
        tenorDate.push(value);
        counterValidate.push(differencesDate[key]);
      } else if (key === "months") {
        value = `${differencesDate[key]}M`;
        tenorDate.push(value);
        counterValidate.push(differencesDate[key]);
      } else if (key === "weeks") {
        value = `${differencesDate[key]}W`;
        tenorDate.push(value);
        counterValidate.push(differencesDate[key]);
      } else if (key === "days") {
        value = `${differencesDate[key]}D`;
        tenorDate.push(value);
        counterValidate.push(differencesDate[key]);
      } else {
        throw new Error("Invalid dates in structure payment table.");
      }
    }
  }

  counterValidate = counterValidate.reduce((curr, acc)=> curr + acc, 0);
  console.log("counterValidate",counterValidate )

  // if(counterValidate === 0){
  //   tenorDate = "0D";
  //   return tenorDate;
  // }

  tenorDate = tenorDate.join("");
  console.log("tenorDate", tenorDate);

  return tenorDate;
}

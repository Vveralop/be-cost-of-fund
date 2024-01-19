import { parseAndFloorNumber } from "../../../../utils/parseAndFloorNumber";

const parserExcelValues = (str) => {
  let parsedValue = str;
  const isInclude = str.includes("$");
  if (isInclude === true) {
    console.log(str.replace("$", ""));
    parsedValue = str.replace("$", "");
    if (parsedValue.trim() === "-") {
      console.log("parsedValue",parsedValue)
      return (parsedValue = 0);
    } else {
      console.log(parseAndFloorNumber(parsedValue))
      return (parsedValue = parseAndFloorNumber(parsedValue));
    }
  }
};

export default parserExcelValues;

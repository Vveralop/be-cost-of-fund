const parseFullTenorToDayTenor = (dateString) => {
  const regex = /^(\d+Y)?(\d+M)?(\d+W)?(\d+D)?$/;
  const matches = dateString.match(regex);

  if (!matches) {
    throw new Error("Invalid date string");
  }

  const [, years, months, weeks, days] = matches;
  console.log(years, months, weeks, days);

  let totalDaysArray = [];

  if (years) {
    let yearValue = parseInt(years) * 365;
    totalDaysArray.push(yearValue);
  }
  if (months) {
    let monthsValue = parseInt(months) * 30;
    totalDaysArray.push(monthsValue);
  }
  if (weeks) {
    let weeksValue = parseInt(weeks) * 7;
    totalDaysArray.push(weeksValue);
  }
  if (days) {
    let daysValue = parseInt(days);
    totalDaysArray.push(daysValue);
  }

  const totalDaysString = totalDaysArray.reduce((curr, acc) => curr + acc);
  console.log(totalDaysString)
  return totalDaysString + "D";
};

export default parseFullTenorToDayTenor;

export default function parseTenorDate(tenorDate) {
  // console.log("tenorDate", tenorDate);
  const currentDate = new Date(); // Get the current date

  const regex = /(\d+)([YyMmWwDd])/g;
  let match;
  // Create a new date object based on the current date
  let parsedDate = new Date(currentDate);

  // Iterate through each match in the tenorDate
  while ((match = regex.exec(tenorDate)) !== null) {
    const [_, value, unit] = match;
    // console.log("regex.exec",value, unit)
    // Evaluate the tenorDate based on the time unit
    if (unit === "Y" || unit === "y") {
      parsedDate.setFullYear(currentDate.getFullYear() + parseInt(value));
    } else if (unit === "M" || unit === "m") {
      parsedDate.setMonth(currentDate.getMonth() + parseInt(value));
    } else if (unit === "W" || unit === "w") {
      parsedDate.setDate(parsedDate.getDate() + parseInt(value) * 7);
    } else if (unit === "D" || unit === "d") {
      parsedDate.setDate(parsedDate.getDate() + parseInt(value));
    }
}

  return parsedDate;
}

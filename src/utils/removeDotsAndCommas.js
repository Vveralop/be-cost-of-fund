export default function removeDotsAndCommas(str) {
  // Use a regular expression to extract only the numeric part.
  const match = str.match(/\d+/g);

  if (match) {
    // Join the extracted numbers into a single string
    // Remove dots and replace commas with dots
    const cleanedStr = match.join('');
    // const cleanedStr = str.replace(/\./g, "").replace(/,/g, ".");
    // Parse the cleaned string to a number
    console.log(parseInt(cleanedStr, 10))
    return parseInt(cleanedStr, 10);
  }

  return NaN;
}

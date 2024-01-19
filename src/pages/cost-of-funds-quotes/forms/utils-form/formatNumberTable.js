const formatNumberTable = (number, decimal = 2) => {
    // convert the number to a string and split it into integer and decimal.
    const [integerPart, decimalPart] = Number(number).toFixed(decimal).split('.');

    // add commas for thousands separator
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,'.');

    // Combine the integer and decimal parts with a commas for decimal separator
    const formattedNumber = decimalPart ? `${formattedIntegerPart},${decimalPart}`: formattedIntegerPart;

    return formattedNumber;
  };
  
  export default formatNumberTable;
  
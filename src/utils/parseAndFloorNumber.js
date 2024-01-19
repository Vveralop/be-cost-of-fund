export const parseAndFloorNumber = (str) => {
    // Remove dots as thousand separators
    let withoutThousands = str.replace(/\./g,"");

    // Replace comma with dot as the decimal separator
    let withDotDecimal = withoutThousands.replace(",",".");

    // Parse the float and apply Math.floor
    let parsedNumber = parseFloat(withDotDecimal);
    let flooredNumber = Math.floor(parsedNumber);

    return flooredNumber;
};
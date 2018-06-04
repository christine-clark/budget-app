/**
 * Round number to a specific number of decimal places.
 * @param {Number} numberToRound - The number to round.
 * @param {String} numberOfDecimalPlaces - The number of decimal places to round number.
 * @return {Number} The rounded number set to specific decimal places.
 */
export function roundNumber(numberToRound, numberOfDecimalPlaces) {
  if (numberToRound === 0) {
    return 0;
  }

  if (!numberToRound) {
    return '';
  }

  const scrubbedNumber = numberToRound.toString().replace('$', '').replace(',', '');
  const rounded = Math.round(scrubbedNumber * Math.pow(10, numberOfDecimalPlaces)) / Math.pow(10, numberOfDecimalPlaces);
  return Number(rounded.toFixed(numberOfDecimalPlaces));
}

/**
 * Sum all values in an array and convert to dollars.
 * @param {Array} value - The array of values to sum.
 * @return {Number} The sum of all values in an array.
 */
export function addArray(values) {
  const total = values.reduce((previousValue, currentValue) => {
    return previousValue + parseInt(convertToPennies(currentValue), 10); // do math in pennies to assure accuracy.
  }, 0);

  return total / 100; // convert back into dollars
}

/**
 * Convert value to pennies.
 * @param {Number} value - The value to convert.
 * @return {Number} The value in pennies.
 */
export function convertToPennies(value) {
  if (value === 0) {
    return 0;
  }

  let dollarValue = parseFloat(value);
  dollarValue = roundNumber(dollarValue, 2); // round to 2 decimal places.
  const dollarValueContainsDecimal = (dollarValue.toString().indexOf('.') !== -1);
  return (dollarValueContainsDecimal) ? parseInt(dollarValue.toString().replace('.', ''), 10) : parseInt(dollarValue, 10) * 100;
}

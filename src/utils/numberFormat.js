import {roundNumber} from './math';

/**
 * Get the sum two values.
 * @param {Number} total - The total to add value.
 * @param {Number} num - The number to add to the total.
 * @return {Number} The sum of two values.
 */
export function getSum(total, num) {
  return total + num;
}

/**
 * Calculate the sum of an array.
 * @param {Array} values - The values to sum.
 * @return {Number} The sum of all values in an array.
 */
export function calculateSum(values) {
  const valueAmounts = values.map(value => Number(value.amount));
  return valueAmounts.length ? valueAmounts.reduce(getSum) : '0';
}

/**
 * Get the number formatted for US currency with proper decimal places.
 * @param {Number} value - The value to format.
 * @return {String} The currency formatted value with dollar sign for US dollars.
 */
export function getCurrencyFormattedNumber(value) {
  if (value === null) {
    return '';
  }

  return '$' + getFormattedNumber(value); // eslint-disable-line prefer-template
}

/**
 * Get the number formatted with proper decimal places and rounded if more than 2 decimal places.
 * @param {Number} value - The value to round and format.
 * @return {String} The formatted number with 2 decimal places.
 */
export function getFormattedNumber(value) {
  if (value === 0) {
    return 0;
  }

  if (!value) {
    return '';
  }

  if (!isInt(scrubFormatting(value))) {
    return ''; // if it's not a number after scrubbing formatting, just return empty.
  }

  let roundedValue = roundNumber(value, 2); // round if more than 2 decimal points
  roundedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // add commas for 1,000's. RegEx from http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const roundedValueContainsDecimalPlace = (roundedValue.indexOf('.') !== -1);

  if (roundedValueContainsDecimalPlace) {
    const numbersToTheRightOfDecimal = roundedValue.split('.')[1];

    switch (numbersToTheRightOfDecimal.length) {
      case 0:
        return roundedValue.replace('.', ''); // no decimal necessary since no numbers after decimal
      case 1:
        return `${roundedValue}0`;
      default:
        return roundedValue;
    }
  }

  return `${roundedValue}.00`;
}

/**
 * Check if a value is an integer.
 * @param {*} n - The value to check.
 * @return {boolean} Determines if the value is an integer.
 */
export function isInt(n) {
  if (n === '' || n === null) {
    return false;
  }

  return n % 1 === 0;
}

/**
 * Scrub the formatting by removing all special symbols, such as $, commas and periods.
 * @param {String} value - The value to scrub.
 * @return {String} The stripped value.
 */
export function scrubFormatting(value) {
  return value.toString().replace('$', '').replace(',', '').replace('.', '');
}

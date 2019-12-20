/**
 * Check if amount is in a valid currency format.
 * @param {String} amount - The amount to check.
 * @return {boolean} Determines if the amount is formatted as currency.
 */
export function isValidCurrency(amount) {
  var USCurrencyRegex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
  return USCurrencyRegex.test(amount);
}

/**
 * Check if date string is a valid date. Checks if date is also valid if a leap year.
 * @param {String} dateString - The date string to check.
 * @return {boolean} Determines if string is a valid date.
 */
export function isValidDate(dateString) {
  const USDateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Date format mm/dd/yyyy
  if (!USDateFormat.test(dateString)) {
    return false;
  }

  const parts = dateString.split("/");
  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[2], 10);

  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = year % 400 == 0 || (year % 100 != 0 && year % 4 == 0);

  if (isLeapYear) {
    monthLength[1] = 29;
  }

  return day > 0 && day <= monthLength[month - 1];
}

/**
 * Validate the form for credit and debits.
 * @param {Object} field - The form field.
 * @return {Object} Error object if form has errors.
 */
export function validateForm(field) {
  let errors = {};
  let formIsValid = true;

  if (!field.postDate) {
    errors.postDate = 'Post date is required. Please enter a post date.';
    formIsValid = false;
  } else if (!isValidDate(field.postDate)) {
    errors.postDate = 'Invalid date format. Please enter date as mm/dd/yyyy.';
    formIsValid = false;
  }

  if (!field.amount) {
    errors.amount = 'Amount is required. Please enter an amount.';
    formIsValid = false;
  } else if (!isValidCurrency(field.amount)) {
    errors.amount = 'Amount is not a valid currency. Please enter amount as XXXX.XX without ($) dollar symbol, for example: 100.00.';
    formIsValid = false;
  }

  return { errors: errors, formIsValid: formIsValid };
}

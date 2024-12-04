// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
  const numStr1 = array1.join('');
  const numStr2 = array2.join('');

  const num1 = Number(numStr1);
  const num2 = Number(numStr2);

  const sum = num1 + num2;
  return sum;
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean} whether the number is a palindrome or not
 */
export function luckyNumber(value) {
  const numString = value.toString();
  const revString = numString.split('').reverse().join('');

  return numString === revString;
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage(input) {
  if (!input) {
    return 'Required field';
  } else if (isNaN(Number(input)) || Number(input) === 0) {
    return 'Must be a number besides 0';
  } else {
    return '';
  }
}

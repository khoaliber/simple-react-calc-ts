/**
 * Accurately calculate
 * @param num1
 * @param operator
 * @param num2
 */
function accurateCalc(
  num1: number | string,
  operator: string,
  num2: number | string
): number {
  num1 = typeof num1 === "string" ? parseFloat(num1) : num1;
  num2 = typeof num2 === "string" ? parseFloat(num2) : num2;

  if (isNaN(num1) || isNaN(num2)) {
    // Values validation
    return Number.NaN;
  }

  const strNum1 = num1 + "";
  const strNum2 = num2 + "";
  const dpNum1 = !!(num1 % 1) ? strNum1.length - strNum1.indexOf(".") - 1 : 0; // Get total decimal places of num1
  const dpNum2 = !!(num2 % 1) ? strNum2.length - strNum2.indexOf(".") - 1 : 0; // Get total decimal places of num2
  const multiplier = Math.pow(10, dpNum1 > dpNum2 ? dpNum1 : dpNum2); // Compare dpNum1 and dpNum2, then find value of 10 to the power of the largest between them.
  const tempNum1 = Math.round(num1 * multiplier); // Multiply num1 by multiplier to eliminate all decimal places of num1.
  const tempNum2 = Math.round(num2 * multiplier); // Multiply num2 by multiplier to eliminate all decimal places of num2.

  let result;
  switch (operator.trim()) {
    case "+":
      result = (tempNum1 + tempNum2) / multiplier;
      break;
    case "-":
      result = (tempNum1 - tempNum2) / multiplier;
      break;
    case "*":
      result = (tempNum1 * tempNum2) / (multiplier * multiplier);
      break;
    case "/":
      result = tempNum1 / tempNum2;
      break;
    case "%":
      result = (tempNum1 % tempNum2) / multiplier;
      break;
    default:
      result = Number.NaN;
  }

  return result;
}

export default accurateCalc;

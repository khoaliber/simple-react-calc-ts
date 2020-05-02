import accurateCalc from "./accurateCalc";

const EXP_SEPARATOR = ",";

/**
 * Calculate the exp which is transformed to postfix style
 *
 * @param {string} exp
 * @returns
 */
function solveExpString(exp: string) {
  exp = infixToPostfix(exp);
  let stack: (number | string)[] = [];

  exp
    .split(EXP_SEPARATOR)
    .filter((curr) => {
      return curr.length > 0;
    })
    .forEach((curr) => {
      if (isDecimal(curr)) {
        stack.push(curr);
      } else {
        const result = accurateCalc(
          stack[stack.length - 2],
          curr,
          stack[stack.length - 1]
        );
        stack.pop();
        stack.pop();
        stack.push(result);
      }
    });

  return stack[0];
}

/**
 * Re-arrange infix expression into postfix expression
 * @param exp
 */
function infixToPostfix(exp: string): string {
  let stack: string[] = [];

  let postfixExp = exp
    .split("")
    .reduce((prev: string, curr: string, currIndex: number, arr: string[]) => {
      if (isDecimal(curr)) {
        if (!isDecimal(arr[currIndex + 1]) && "." !== arr[currIndex + 1]) {
          curr = curr + EXP_SEPARATOR;
        }
      } else if ("." === curr) {
        // do nothing
      } else {
        [curr, stack] = handleOperatorExchange(curr, stack);
      }

      return prev + curr;
    }, "");

  // popout the rest operators
  while (0 < stack.length) {
    postfixExp += stack.pop() + EXP_SEPARATOR;
  }

  return postfixExp;
}

function isDecimal(str: string): boolean {
  const decimalRegex = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/g);
  return decimalRegex.test(str);
}

function handleOperatorExchange(
  curr: string,
  stack: string[]
): [string, string[]] {
  const priorityMap: { [key: string]: number } = {
    ")": 0,
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const stackLength = stack.length;
  if (0 === stackLength) {
    stack.push(curr);
    curr = "";
  } else {
    // should popout top item
    const shouldPopout =
      priorityMap[curr] <= priorityMap[stack[stackLength - 1]];

    if (shouldPopout) {
      // Handle parenthesis
      if (")" === curr) {
        let popOut = "";
        while ("(" !== stack[stack.length - 1]) {
          popOut = stack.pop() + EXP_SEPARATOR + popOut;
        }

        stack.pop();
        curr = popOut;
      }

      // handle normal operators
      else {
        let popOut = "";
        do {
          popOut += stack.pop() + EXP_SEPARATOR;
        } while (priorityMap[curr] <= priorityMap[stack[stack.length - 1]]);

        stack.push(curr); // push in newInput
        curr = popOut; // pop out operators
      }
    }

    // should push into stack without popping out anything
    else {
      stack.push(curr);
      curr = "";
    }
  }

  return [curr, stack];
}

export default solveExpString;

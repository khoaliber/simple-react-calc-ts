import React, { FC, useState } from "react";
import accurateCalc from "../../utils/accurateCalc";
import classes from "./Calc.module.css";
import CalcDisplay from "../../components/CalcDisplay/CalcDisplay";
import CalcKeyboard from "../../components/CalcKeyboard/CalcKeyboard";

interface IProps {}

const CalcRegex: FC<IProps> = () => {
  const [displayValue, setDisplayValue] = useState("");

  const clearOneHandler: React.MouseEventHandler = () => {
    setDisplayValue(displayValue.substr(0, displayValue.length - 1));
  };

  const clearAllHandler: React.MouseEventHandler = () => {
    setDisplayValue("");
  };

  const btnClickHandler: React.MouseEventHandler<HTMLElement> = (e) => {
    const input = e.currentTarget;
    setDisplayValue(displayValue + input.innerText);
  };

  /**
   * Solve simple exp without parenthesis
   */
  const solveSimpleExp = (exp: string): number => {
    // split exp into pieces
    let expParts: string[] | null = exp.match(
      /([+-]|)(\d+(\.\d+)?[\*/][+\-]?)*\d+(\.\d+)?(?=[+-]|)/gi
    );
    if (!expParts || !expParts.length) return 0;

    let result = 0;

    // solve simple parts and return complex parts
    let complexParts: string[] | null = expParts?.filter((num) => {
      if (!num.match(/[\*/]/gi)) {
        result = accurateCalc(result, "+", num);
      }

      return num.match(/[\*/]/gi);
    });

    // then, solve complex parts
    complexParts?.forEach((exp) => {
      let parts: string[] | null = exp.match(/([\*/]|)[+\-]?\d+(\.\d+)?/gi);
      if (!parts || !parts.length) return;

      let tempResult = parts?.reduce((prev: string, curr: string): any => {
        const operator = curr[0];
        const currNum = curr.substr(1);
        if (prev[0] === "*" || prev[0] === "/") {
          prev = prev.substr(1);
        }

        return accurateCalc(prev, operator, currNum);
      });

      result += parseFloat(tempResult);
    });

    return result;
  };

  const solvingHandler = () => {
    // this.errorDiv.innerHTML = ''
    let exp = displayValue; // the input string

    // solve exp inside () and simplify the exp until there is no () left
    while (exp.match(/\([\d.+\-\*/]+?\)/gi)) {
      exp = exp.replace(/\([\d\.+\-\*/]+?\)/gi, (match: string): any => {
        return solveSimpleExp(match);
      });
    }

    const result = solveSimpleExp(exp);
    setDisplayValue(result + "");
  };

  return (
    <div className={classes.Calc}>
      <h1>Using Regex</h1>
      <CalcDisplay displayValue={displayValue} />
      <CalcKeyboard
        addChar={btnClickHandler}
        clearOne={clearOneHandler}
        clearAll={clearAllHandler}
        solve={solvingHandler}
      />
    </div>
  );
};

export default CalcRegex;

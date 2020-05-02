import React, { FC, useState } from "react";
import classes from "./Calc.module.css";
import CalcDisplay from "../../components/CalcDisplay/CalcDisplay";
import CalcKeyboard from "../../components/CalcKeyboard/CalcKeyboard";
import solveExpString from "../../utils/calculation";

interface IProps {}

const CalcPostfix: FC<IProps> = () => {
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

  const solvingHandler = () => {
    const result = solveExpString(displayValue);
    setDisplayValue(result + "");
  };

  return (
    <div className={classes.Calc}>
      <h1>Using Stack Algorithm</h1>
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

export default CalcPostfix;

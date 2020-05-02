import React from "react";
import classes from "./CalcKeyboard.module.css";
import KeyButton from "../KeyButton/KeyButton";

interface IProps {
  addChar: React.MouseEventHandler;
  clearOne: React.MouseEventHandler;
  clearAll: React.MouseEventHandler;
  solve: React.MouseEventHandler;
}

const CalcKeyboard = ({ addChar, clearAll, clearOne, solve }: IProps) => (
  <div className={classes.CalcKeyboard}>
    <div className={classes.row}>
      <KeyButton func={addChar}>(</KeyButton>
      <KeyButton func={addChar}>)</KeyButton>
      <KeyButton func={clearOne}>C</KeyButton>
      <KeyButton func={clearAll}>AC</KeyButton>
    </div>
    <div className={classes.row}>
      <KeyButton func={addChar}>7</KeyButton>
      <KeyButton func={addChar}>8</KeyButton>
      <KeyButton func={addChar}>9</KeyButton>
      <KeyButton func={addChar}>/</KeyButton>
    </div>
    <div className={classes.row}>
      <KeyButton func={addChar}>4</KeyButton>
      <KeyButton func={addChar}>5</KeyButton>
      <KeyButton func={addChar}>6</KeyButton>
      <KeyButton func={addChar}>*</KeyButton>
    </div>
    <div className={classes.row}>
      <KeyButton func={addChar}>1</KeyButton>
      <KeyButton func={addChar}>2</KeyButton>
      <KeyButton func={addChar}>3</KeyButton>
      <KeyButton func={addChar}>-</KeyButton>
    </div>
    <div className={classes.row}>
      <KeyButton func={addChar}>0</KeyButton>
      <KeyButton func={addChar}>.</KeyButton>
      <KeyButton func={solve}>=</KeyButton>
      <KeyButton func={addChar}>+</KeyButton>
    </div>
  </div>
);

export default CalcKeyboard;

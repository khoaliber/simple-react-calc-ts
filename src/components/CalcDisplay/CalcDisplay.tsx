import React from "react";
import classes from "./CalcDisplay.module.css";

interface IProps {
  displayValue: string;
}

const CalcDisplay = ({ displayValue }: IProps) => (
  <div className={classes.CalcDisplay}>
    <div className={classes.container}>
      <input
        type="text"
        disabled
        className={classes.display}
        value={displayValue}
      />
    </div>
  </div>
);

export default CalcDisplay;

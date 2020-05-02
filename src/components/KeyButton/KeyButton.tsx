import React from "react";
import classes from "./KeyButton.module.css";

interface IProps {
  func: React.MouseEventHandler;
  children: any;
}

const KeyButton = ({ func, children }: IProps) => (
  <div className={classes.KeyButton} onClick={func}>
    {children}
  </div>
);

export default KeyButton;

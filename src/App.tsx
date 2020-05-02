import React from "react";
import "./App.css";
import CalcPostfix from "./containers/Calc/CalcPostfix";

function App() {
  return (
    <div className="App">
      <div className="calc-container">
        <CalcPostfix />
      </div>

      <a href="https://github.com/khoaliber/simple-react-calc-ts">
        https://github.com/khoaliber/simple-react-calc-ts
      </a>
    </div>
  );
}

export default App;

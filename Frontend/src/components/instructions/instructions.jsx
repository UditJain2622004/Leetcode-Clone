import React from "react";
import "./instructions.css";

function Instructions() {
  return (
    <div className="instructions-section">
      <h5 className="instruction-title">Instructions</h5>
      <ul>
        <li className="instructions">Take Input from stdin</li>
        <li className="instructions">Put Output to stdout</li>
        <li className="instructions">
          You can not put anything else to stdout other than the final output.
          The first stdout is taken as output.
        </li>
      </ul>
    </div>
  );
}

export default Instructions;

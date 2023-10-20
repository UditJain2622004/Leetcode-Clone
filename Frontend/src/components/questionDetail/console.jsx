import React from "react";
import "./console.css";

function Console({ response }) {
  const details = response?.data?.output;
  return (
    <>
      {!response.success && (
        <div className="console">
          <p className="red-txt">
            Some internal error occured! Please try again.
          </p>
        </div>
      )}
      {details && details.success && (
        <div className="console">
          <div className="row">
            <div className="col">
              <h4 className="green-txt">Accepted ✅</h4>
              <p className="green-txt">
                Cases Passed : {details.passed_cases}/{details.total_cases}
              </p>
            </div>
            <div className="col console-details">
              <h4>Runtime</h4>
              <p className="green-txt">{details.time * 1000} ms</p>
              <p>Beats {details.time_status}% users</p>
            </div>
            <div className="col console-details">
              <h4>Memory Used</h4>
              <p className="green-txt">
                {response.data.output.memory / 1000} MB
              </p>
              <p>Beats {details.memory_status}% users</p>
            </div>
          </div>
        </div>
      )}

      {details && !details.success && (
        <div className="console">
          <div className="row">
            <p className="red-txt col">
              Cases Passed : {details.passed_cases}/{details.total_cases}
            </p>
          </div>
          <div className="row">
            <h5 className="red-txt col">❌ {details.description}</h5>
          </div>
          <div className="row">
            {details.stderr && <p className=" red-txt col">{details.stderr}</p>}
          </div>
          <div className="row">
            {details.compile_output && (
              <p className=" red-txt col">{details.compile_output}</p>
            )}
          </div>
          <div className="row">
            {details.message && (
              <p className=" red-txt col">{details.message}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Console;

import React from "react";
import "./LoadingSpinner.scss";
const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

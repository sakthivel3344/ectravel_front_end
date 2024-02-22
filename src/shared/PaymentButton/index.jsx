import React from "react";
import "./PaymentButton.scss";

const PaymentButton = ({className,handleOnClick}) => {
  return <div className={"PaymentButton " + className} onClick={handleOnClick}>
    PAY NOW
  </div>;
};

export default PaymentButton;

import React from "react";
import "./BookingInputBox.scss";

const BookingInputBox = ({
  className,
  name,
  type,
  placeHolder,
  value,
  handleOnChange,
}) => {
  return (
    <input
      className={"BookingInputBox " + className}
      name={name}
      type={type}
      placeholder={placeHolder}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default BookingInputBox;

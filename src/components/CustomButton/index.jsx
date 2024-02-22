import React from 'react'
import "./CustomButton.scss";

const CustomButton = ({value, onClick, customClassName, type}) => {
  let className;
  switch (type) {
    case "add":
      className = "add-btn";
      break;
    case "submit":
      className = "submit-btn"
      break;
    case "edit":
      className = "edit-btn";
      break;
    case "delete":
      className = "delete-btn";
      break;
    default:
      break;
  }
  return (
    <button className={`CustomButton ${className} ${customClassName}`} onClick={onClick}>{value}</button>
  )
}

export default CustomButton;
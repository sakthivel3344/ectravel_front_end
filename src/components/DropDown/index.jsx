import React, { useState } from "react";
import "./DropDown.scss";
const DropDown = ({ className = "", state, setState, dropDownList }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleOnClick = () => {
    setIsVisible(!isVisible);
  };
  const handleSelect = (selectedValue) => {
    setState(selectedValue);
    handleOnClick();
  };
  return (
    <div className={"DropDown " + className}>
      <div className="drop-down-content" onClick={handleOnClick}>
        <p>{state}</p>
        {!isVisible ? (
          <span className="material-symbols-outlined drop-down-icon">
            arrow_drop_down
          </span>
        ) : (
          <span className="material-symbols-outlined">arrow_drop_up</span>
        )}
      </div>

      {isVisible && (
        <ul className="drop-down-list-wrapper">
          {dropDownList.map((dropDown, index) => {
            return (
              <li
                key={index}
                onClick={() => handleSelect(dropDown)}
                className="drop-down-item"
              >
                {dropDown}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DropDown;

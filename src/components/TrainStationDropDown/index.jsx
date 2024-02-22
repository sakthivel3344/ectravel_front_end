import React, { useState } from "react";
import "./TrainStationDropDown.scss";
const TrainStationDropDown = ({
  className,
  stationList,
  state,
  handleSetState,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleOnClick = () => {
    setIsVisible(!isVisible);
  };
  const handleItemClick = (station) => {
    handleSetState(station);
    handleOnClick();
  };
  return (
    <div className={"TrainStationDropDown " + className}>
      <div className="drop-down-content" onClick={handleOnClick}>
        <p>{state.stationName + " " + state.stationTime}</p>
        <div className="wrapper">
          <p className="change-text">change</p>
          <span className="material-symbols-outlined drop-down-icon">
            arrow_drop_down
          </span>
        </div>
      </div>
      {isVisible && (
        <ul className="drop-down-list-container">
          {stationList.map((station, index) => {
            return (
              <li
                key={index}
                className="station-item"
                onClick={() => handleItemClick(station)}
              >
                {station.stationName + " " + station.stationTime}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TrainStationDropDown;

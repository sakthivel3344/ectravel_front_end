import React from "react";
import "./TrainSeatDetails.scss";
import { useNavigate } from "react-router-dom";
const TrainSeatDetails = ({ seat,pageData }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if(seat.availCount === 0){
      return;
    }
    navigate("/services/trainBooking",{state: pageData});
  };
  return (
    <div
      className={`TrainSeatDetails ${
        seat.availCount === 0 ? `not-available` : ``
      }`}
      onClick={handleOnClick}
    >
      <div className="seat-details-top">
        <div className="seat-details-top-content">
          <p className="seat-name-text">{seat.seatName}</p>
          <p className="avail-count">
            {seat.availCount === 0
              ? `NOT AVAILABLE`
              : `AVAILABLE ${seat.availCount}`}
          </p>
        </div>
        <p className="seat-price">Rs.{seat.price}</p>
      </div>
      <p className="free-text">Free Cancellation</p>
    </div>
  );
};

export default TrainSeatDetails;

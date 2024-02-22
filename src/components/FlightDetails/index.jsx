import React, { useState } from "react";
import "./FlightDetails.scss";
import FlightOtherDetails from "./FlightOtherDetails";
import { calcDuration, monthNoToMonthStr } from "../../utils/TicketBooking";
import { useNavigate } from "react-router-dom";

const FlightDetails = (props) => {
  const { flightData, fromPlace, toPlace, date } = props;
  const [detailsDropDown, setDetailsDropDown] = useState(false);
  const handleViewDetailsOnClick = () => {
    setDetailsDropDown(!detailsDropDown);
  };
  const navigate = useNavigate();

  const handelBookNowBtnOnClick = () => {
    const data = {
      flightData: flightData,
      fromPlace: fromPlace,
      toPlace: toPlace,
      date: date,
    };
    navigate("/services/flightBooking", { state: data });
  };
  return (
    <div className="FlightDetails">
      <div className="flight-details-container">
        <div className="flight-details-top">
          <p className="flight-name">{flightData.flightName}</p>
          <div className="pickup-details">
            <p className="time">{flightData.pickUpTime}</p>
            <p>{fromPlace}</p>
          </div>
          <div className="duration-details">
            <p>
              {calcDuration(
                flightData.pickUpDate,
                flightData.dropDate,
                flightData.pickUpTime,
                flightData.dropTime
              )}
            </p>
            {flightData.stopping === "" ? (
              <>
                <p>--------------</p>
                <p>Non Stop</p>
              </>
            ) : (
              <>
                <p>-------.-------</p>
                <p>{flightData.stopping}</p>
              </>
            )}
          </div>
          <div className="drop-details">
            <p className="time">{flightData.dropTime}</p>
            <p>{toPlace}</p>
          </div>
          <div className="book-now-wrapper">
            <div className="price-details">
              <p className="price">Rs.{flightData.price}</p>
              <p>per adult</p>
            </div>
            <button className="book-btn" onClick={handelBookNowBtnOnClick}>
              Book Now
            </button>
          </div>
        </div>
        <div className="flight-details-bottom">
          <div className="avail-count-wrapper">
            <p>Economy: {flightData.economyAvailCount}</p>
            <p>Business: {flightData.businessAvailCount}</p>
          </div>
          <p
            className={"view-details-text " + (detailsDropDown && "active")}
            onClick={handleViewDetailsOnClick}
          >
            {detailsDropDown ? "Hide " : "View "}
            Flight Details
          </p>
        </div>
      </div>
      {detailsDropDown && (
        <div className="view-details-container">
          <div className="details-wrapper">
            <p className="from-to">
              {fromPlace +
                " to " +
                toPlace +
                ", " +
                date.split("-")[2] +
                " " +
                monthNoToMonthStr(date.split("-")[1])}
            </p>
            {flightData.stopping === "" ? (
              <FlightOtherDetails
                flightData={flightData}
                fromPlace={fromPlace}
                toPlace={toPlace}
                pickUpDate={flightData.pickUpDate}
                dropDate={flightData.dropDate}
                pickUpTime={flightData.pickUpTime}
                dropTime={flightData.dropTime}
              />
            ) : (
              <>
                <FlightOtherDetails
                  flightData={flightData}
                  fromPlace={fromPlace}
                  toPlace={flightData.stopping}
                  pickUpDate={flightData.pickUpDate}
                  dropDate={flightData.stoppingDate}
                  pickUpTime={flightData.pickUpTime}
                  dropTime={flightData.stoppingTime}
                />
                <hr className="hr-line" />
                <FlightOtherDetails
                  flightData={flightData}
                  fromPlace={flightData.stopping}
                  toPlace={toPlace}
                  pickUpDate={flightData.stoppingDate}
                  dropDate={flightData.dropDate}
                  pickUpTime={flightData.stoppingTime}
                  dropTime={flightData.dropTime}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetails;

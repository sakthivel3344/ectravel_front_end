import React from "react";
import "./FlightOtherDetails.scss";
import { calcDuration, monthNoToMonthStr } from "../../../utils/TicketBooking";

const FlightOtherDetails = (props) => {
  const {
    flightData,
    fromPlace,
    toPlace,
    pickUpDate,
    dropDate,
    pickUpTime,
    dropTime,
  } = props;
  return (
    <div className="FlightOtherDetails">
      <p className="flight-name">{flightData.flightName}</p>
      <div className="content-wrapper">
        <div className="container-1">
          <div className="pickup-details">
            <p className="time">{pickUpTime}</p>
            <p className="full-date">{`${pickUpDate.split("-")[2]}  ${monthNoToMonthStr(
              pickUpDate.split("-")[1]
            )} ${pickUpDate.split("-")[0].slice(2, 4)}`}</p>
            <p>{fromPlace}</p>
          </div>
          <div className="duration-details">
            <p>{calcDuration(pickUpDate, dropDate, pickUpTime, dropTime)}</p>
            <p>--------------</p>
          </div>
          <div className="drop-details">
            <p className="time">{dropTime}</p>
            <p className="full-date">{`${dropDate.split("-")[2]}  ${monthNoToMonthStr(
              dropDate.split("-")[1]
            )} ${dropDate.split("-")[0].slice(2, 4)}`}</p>
            <p>{toPlace}</p>
          </div>
        </div>
        <div className="container-2">
          <div className="detail-wrapper">
            <p className="detail-title">BAGGAGE:</p>
            <p>ADULT</p>
          </div>
          <div className="detail-wrapper">
            <p className="detail-title">CHECK IN</p>
            <p>{flightData.cabinBagLimit}</p>
          </div>
          <div className="detail-wrapper">
            <p className="detail-title">CABIN</p>
            <p>{flightData.checkInLimit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightOtherDetails;

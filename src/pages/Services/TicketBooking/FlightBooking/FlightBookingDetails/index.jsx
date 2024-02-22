import React from "react";
import "./FlightBookingDetails.scss";
import {
  calcDuration,
  monthNoToMonthStr,
} from "../../../../../utils/TicketBooking";

const FlightBookingDetails = ({
  data,
  pickUpDate,
  pickUpTime,
  dropDate,
  dropTime,
  fromPlace,
  toPlace,
}) => {
  const { flightData, date } = data;
  return (
    <div className="FlightBookingDetails">
      <p className="flight-name">{flightData.flightName}</p>
      <div className="details-container">
        <div className="flight-details-wrapper">
          <div className="detail detail-1">
            <p>
              {pickUpTime +
                " · " +
                pickUpDate.split("-")[2] +
                " " +
                monthNoToMonthStr(pickUpDate.split("-")[1])}
            </p>
            <p>
              {dropTime +
                " · " +
                dropDate.split("-")[2] +
                " " +
                monthNoToMonthStr(dropDate.split("-")[1])}
            </p>
          </div>
          <div className="detail detail-2">
            <span className="circle" />
            <span className="dashed-line" />
            <span className="circle" />
          </div>
          <div className="detail detail-3">
            <p>{fromPlace}</p>
            <p>{calcDuration(pickUpDate, dropDate, pickUpTime, dropTime)}</p>
            <p>{toPlace}</p>
          </div>
        </div>
        <div className="detail-4">
          <p>Cabin Baggage: {flightData.cabinBagLimit}kg</p>
          <p>Check-In Baggage: {flightData.checkInLimit}kg</p>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingDetails;

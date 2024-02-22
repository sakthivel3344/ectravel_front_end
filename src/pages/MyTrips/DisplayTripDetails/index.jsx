import React from "react";
import "./DisplayTripDetails.scss";
import { TRANSPORT_TYPE } from "../../../constants/stringConstants";
import { monthNoToMonthStr } from "../../../utils/TicketBooking";
import { useNavigate } from "react-router-dom";

const DisplayTripDetails = ({ tripData, currentPage, bgGradientClassName }) => {
  const navigate = useNavigate();

  const getIconText = (transportType) => {
    switch (transportType) {
      case TRANSPORT_TYPE.BUS:
        return "directions_bus";
      case TRANSPORT_TYPE.TRAIN:
        return "train";
      case TRANSPORT_TYPE.FLIGHT:
        return "flightsmode";
      default:
        return "";
    }
  };

  const getTransportText = (transportType) => {
    switch (transportType) {
      case TRANSPORT_TYPE.BUS:
        return "Bus";
      case TRANSPORT_TYPE.TRAIN:
        return "Train";
      case TRANSPORT_TYPE.FLIGHT:
        return "Flight";
      default:
        return "Unknown";
    }
  };

  const getTripStatus = (pageNo) => {
    switch (pageNo) {
      case 1:
        return "Upcoming";
      case 2:
        return "Cancelled";
      case 3:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getBgColorClassName = (currentPage) => {
    switch (currentPage) {
      case 1:
        return "upcoming-bg";
      case 2:
        return "cancelled-bg";
      case 3:
        return "completed-bg";
      default:
        return "";
    }
  };

  const handleViewBookingBtnOnClick = () => {
    navigate("/bookedTripDetails", {
      state: {
        tripData: tripData,
        bgGradientClassName: bgGradientClassName,
        tripStatus: getTripStatus(currentPage),
        iconText: getIconText(tripData.myTripTransport.transportType),
        // bgGratientClassName: getBgColorClassName(currentPage),
      },
    });
  };
  return (
    <div className="DisplayTripDetails">
      <div className="container-1">
        <div className="content-1">
          <p className="from-to-title">{`${tripData.myTripTransport.fromPlace} → ${tripData.myTripTransport.toPlace}`}</p>
          <p>
            {`${getTripStatus(currentPage)} · ${getTransportText(
              tripData.myTripTransport.transportType
            )} · Booking ID - BKID${tripData.tripId}`}
          </p>
        </div>
        <button
          className="view-booking-btn"
          onClick={handleViewBookingBtnOnClick}
        >
          VIEW BOOKING
        </button>
        <div className="icon-container">
          <span className="material-symbols-outlined">
            {getIconText(tripData.myTripTransport.transportType)}
          </span>
        </div>
      </div>
      <div className="container-2">
        <div className="content-1">
          <p>From</p>
          <p>
            <span className="date-text">{`
            ${
              tripData.myTripTransport.pickUpDate.split("-")[2]
            } ${monthNoToMonthStr(
              tripData.myTripTransport.pickUpDate.split("-")[1]
            )} \`${tripData.myTripTransport.pickUpDate
              .split("-")[0]
              .slice(2, 4)}`}</span>
            {" · " + tripData.myTripTransport.pickUpTime}
          </p>
          <p>{tripData.myTripTransport.fromPlace}</p>
        </div>
        <div className="content-2">
          <p>To</p>
          <p>
            <span className="date-text">{`
            ${
              tripData.myTripTransport.dropDate.split("-")[2]
            } ${monthNoToMonthStr(
              tripData.myTripTransport.dropDate.split("-")[1]
            )} \`${tripData.myTripTransport.dropDate
              .split("-")[0]
              .slice(2, 4)}`}</span>
            {" · " + tripData.myTripTransport.dropTime}
          </p>
          <p>{tripData.myTripTransport.toPlace}</p>
        </div>
        <div className="content-3">
          <p>
            {tripData.passengerList[0].passengerName +
              (tripData.passengerList.length > 1
                ? ` + ${tripData.passengerList.length - 1}`
                : "")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayTripDetails;

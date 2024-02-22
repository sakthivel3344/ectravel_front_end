import React, { useEffect, useState } from "react";
import "./BookedTripDetails.scss";
import bus_img from "../../assets/images/TicketBooking/bus_img.png";
import { useLocation } from "react-router-dom";
import { MALE, TRANSPORT_TYPE } from "../../constants/stringConstants";
import { INITIAL_PNR_VALUE } from "../../constants/valueConstants";

import { monthNoToMonthStr } from "../../utils/TicketBooking";

const BookedTripDetails = () => {
  const location = useLocation();
  console.log(">> ", location.state);
  const [tripData, setTripData] = useState(location.state);

  const getTitle = (transportType, status) => {
    if (status === "Upcoming") {
      switch (transportType) {
        case TRANSPORT_TYPE.BUS:
          return "Your Upcoming Bus Trip";
        case TRANSPORT_TYPE.TRAIN:
          return "Your Upcoming Train Trip";
        case TRANSPORT_TYPE.FLIGHT:
          return "Your Upcoming Flight Trip";
        default:
          break;
      }
    } else if (status === "Completed") {
      switch (transportType) {
        case TRANSPORT_TYPE.BUS:
          return "Your Bus Trip has Completed";
        case TRANSPORT_TYPE.TRAIN:
          return "Your Train Trip has Completed";
        case TRANSPORT_TYPE.FLIGHT:
          return "Your Flight Trip has Completed";
        default:
          break;
      }
    } else {
    }
  };

  useEffect(() => {
    // const element = array[index];
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification(`Notification`, {
          body: "More Data about the notofication",
          tag: "tag1",
        });
      }
    });
  }, []);

  return (
    <div className="BookedTripDetails">
      <nav className={"navbar-container " + tripData?.bgGradientClassName}>
        <div className="navbar-content-wrapper">
          <div className="navbar-left-content">
            <p className="title">
              {getTitle(
                tripData?.tripData.myTripTransport.transportType,
                location.state.tripStatus
              )}
            </p>
            <div className="id-content-container">
              <p className="nav-text">
                <span className="label-text">Booking ID#</span>{" "}
                {" BKID" + tripData?.tripData.tripId}
              </p>
              <p className="nav-text">
                <span className="label-text">PNR#</span>{" "}
                {"BKUN" + (INITIAL_PNR_VALUE + tripData?.tripData.tripId)}
              </p>
            </div>
          </div>
          <p className="navbar-right-content nv-text">
            <span className="label-text">Booked On</span>{" "}
            {tripData?.tripData?.bookedDate?.split("-")[2] +
              " " +
              monthNoToMonthStr(tripData?.tripData?.bookedDate?.split("-")[1]) +
              " `" +
              tripData?.tripData?.bookedDate?.split("-")[0].slice(2, 4)}
          </p>
        </div>
      </nav>
      <div className="trip-details-content-container">
        <div className="content-left">
          {/* From - To details Container */}
          <div className="detail-1">
            <div className="wrapper-1">
              <p>
                <span className="from-to-title">
                  {tripData?.tripData.myTripTransport.fromPlace +
                    " → " +
                    tripData?.tripData.myTripTransport.toPlace +
                    " "}
                </span>
                {tripData?.tripData.myTripTransport.pickUpDate.split("-")[2] +
                  " " +
                  monthNoToMonthStr(
                    tripData?.tripData.myTripTransport.pickUpDate.split("-")[1]
                  ) +
                  " " +
                  tripData?.tripData.myTripTransport.pickUpDate.split("-")[0]}
              </p>
              {location.state.tripStatus === "Upcoming" ? (
                <p className="upcoming-status">Upcoming</p>
              ) : location.state.tripStatus === "Completed" ? (
                <p className="completed-status">Completed</p>
              ) : (
                "Canceled"
              )}
            </div>
            <div className="wrapper-2">
              <div className="from-wrapper">
                <p>
                  <span className="time-text">
                    {tripData?.tripData.myTripTransport.pickUpTime}{" "}
                  </span>
                  {tripData?.tripData.myTripTransport.pickUpDate.split("-")[2] +
                    " " +
                    monthNoToMonthStr(
                      tripData?.tripData.myTripTransport.pickUpDate.split(
                        "-"
                      )[1]
                    )}
                </p>
                <p className="place-text">
                  {tripData?.tripData.myTripTransport.fromPlace}
                </p>
                <p>
                  Boarding Point -{" "}
                  {tripData?.tripData.myTripTransport.fromPlace}
                </p>
              </div>
              <div className="duration-wrapper">
                <span className="material-symbols-outlined transport-icon">
                  {tripData?.iconText}
                </span>
                <div className="duration-ui-container">
                  <span className="solid-circle" />
                  <span className="dashed-line" />
                  <span className="solid-circle" />
                </div>
              </div>
              <div className="to-wrapper">
                <p>
                  <span className="time-text">
                    {tripData?.tripData.myTripTransport.dropTime}{" "}
                  </span>
                  {tripData?.tripData.myTripTransport.dropDate.split("-")[2] +
                    " " +
                    monthNoToMonthStr(
                      tripData?.tripData.myTripTransport.dropDate.split("-")[1]
                    )}
                </p>
                <p className="place-text">
                  {tripData?.tripData.myTripTransport.toPlace}
                </p>
                <p>Drop Point - {tripData?.tripData.myTripTransport.toPlace}</p>
              </div>
            </div>
            <div className="wrapper-3">
              <p>
                <span className="transport-name">
                  {tripData?.tripData.myTripTransport.transportName}
                </span>{" "}
                - Non A/c-seater
              </p>
            </div>
          </div>

          {/* Travellers Details Container */}

          <div className="detail-2">
            <p className="title">
              Traveller(s) ({tripData?.tripData.passengerList.length})
            </p>

            {tripData?.tripData.passengerList.map((passengerData) => {
              return (
                <div className="traveller-detail">
                  <div className="content-1">
                    <span class="material-symbols-outlined">person</span>
                    <span className="traveller-name">
                      {passengerData.passengerName}
                    </span>
                    <p className="date-text">{`${
                      passengerData.passengerAge
                    }yrs, ${
                      passengerData.gender === MALE ? "Male" : "Female"
                    }`}</p>
                  </div>
                  <p>{`Seat ${passengerData.seatNo}`}</p>
                </div>
              );
            })}
          </div>
          {/* Contact Details Container */}
          <div className="detail-3">
            <div className="nav-container">
              <p className="title">Contact Details</p>
              <p className="description">
                Operator or our service experts might connect with you on below
                contact details.
              </p>
            </div>
            <div className="contact-content">
              <span class="material-symbols-outlined">person</span>
              <p className="detail-text">
                {tripData?.tripData.passengerList[0].passengerName}
              </p>
            </div>
            <div className="contact-content">
              <span class="material-symbols-outlined">mail</span>
              <p className="detail-text">
                {tripData?.tripData.contactDetails.emailId}
              </p>
            </div>
            <div className="contact-content">
              <span class="material-symbols-outlined">call</span>
              <p className="detail-text">
                {tripData?.tripData.contactDetails.mobileNo}
              </p>
            </div>
          </div>
        </div>
        {/* Right side content (Price details) */}
        <div className="content-right">
          <p className="title">PRICING BREAKUP</p>
          <div className="price-wrapper">
            <p>Bus Charges</p>
            <p>₹ {tripData?.tripData.myTripTransport.price}</p>
          </div>
          <div className="total-price-wrapper">
            <p>Total cost</p>
            <p>₹ {tripData?.tripData.myTripTransport.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTripDetails;

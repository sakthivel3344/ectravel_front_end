import React, { useEffect, useState } from "react";
import "./BusBooking.scss";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMain } from "../../../../contexts/MainContext";
import { handlePayment } from "../../../../utils/payment";
import { TRANSPORT_TYPE } from "../../../../constants/stringConstants";
import {
  handleBusPaymentApiCall,
  handleCheckAvailBusApiCall,
} from "../../../../utils/ApiCalls";
import { BUS_TAX } from "../../../../constants/taxConstants";
const BusBooking = () => {
  const location = useLocation();
  const mainContext = useMain();
  const navigate = useNavigate();
  console.log(">>> ", location.state);
  const setInitialTravellersDetails = () => {
    let objList = [];
    location.state.selectSeat.selectedSeatDetailsList.map((seat) => {
      objList.push({
        name: "",
        age: "",
        gender: "",
        seatId: seat.seatId,
      });
    });
    return objList;
  };
  const [bookingData, setBookingData] = useState({
    travellersDetails: setInitialTravellersDetails(),
    contactDetails: {
      emailId: "",
      mobileNo: "",
    },
  });
  const selectedSeatNoListNum = location.state.selectedSeatNoList.split(",");
  const handleContactDetailsOnChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      contactDetails: {
        ...bookingData.contactDetails,
        [name]: value,
      },
    });
  };
  const handleTravellersOnChange = (e, index) => {
    const { name, value } = e.target;
    let tempList = bookingData.travellersDetails;
    tempList[index] = {
      ...tempList[index],
      [name]: value,
    };
    setBookingData({
      ...bookingData,
      travellersDetails: tempList,
    });
  };
  const handleSelectGender = (index, value) => {
    let tempList = bookingData.travellersDetails;
    tempList[index] = {
      ...tempList[index],
      gender: value,
    };
    setBookingData({
      ...bookingData,
      travellersDetails: tempList,
    });
  };

  const handlePaymentCallBack = (response) => {
    // console.log(response.razorpay_payment_id);
    const dateObj = new Date();
    const data = {
      passengerList: bookingData.travellersDetails,
      contactDetails: bookingData.contactDetails,
      tripDetails: {
        fromPlace: location.state.pickUpPlace,
        toPlace: location.state.dropPlace,
        pickUpDate: location.state.pickUpDate,
        pickUpTime: location.state.pickUpTime,
        dropDate: location.state.dropDate,
        dropTime: location.state.dropTime,
        tripType: TRANSPORT_TYPE.BUS,
        tripPrice: location.state.totalPrice + BUS_TAX,
      },
      busId: location.state.busId,
      userId: mainContext.loginDetails.userId,
      paymentStatus: true,
      razorpayPaymentId: response.razorpay_payment_id,
      bookedDate: dateObj.toISOString().split("T")[0],
      bookedTime: dateObj.getHours() + ":" + dateObj.getMinutes(),
    };
    const result = handleBusPaymentApiCall(data);
    result
      .then((res) => {
        if (res) {
          alert("Bus Booked Successfully");
          // navigate("/services/ticketbooking");
          const dataObj = {
            vehicle: "bus",
            fromPlace: location.state.fromPlace,
            toPlace: location.state.toPlace,
            date: location.state.date,
          };
          let response = handleCheckAvailBusApiCall(dataObj);
          response.then((res) => {
            const data = {
              data: res.data,
              fromPlace: dataObj.fromPlace,
              toPlace: dataObj.toPlace,
              date: dataObj.date,
            };
            navigate("/services/availBus", { state: data, replace: true });
          });
        }
      })
      .catch((res) => {
        alert("Bus Booking Failed");
      });
  };
  const handleApiCall = () => {
    const data = {
      passengerList: bookingData.travellersDetails,
      contactDetails: bookingData.contactDetails,
      tripDetails: {
        fromPlace: location.state.pickUpPlace,
        toPlace: location.state.dropPlace,
        pickUpDate: location.state.pickUpDate,
        pickUpTime: location.state.pickUpTime,
        dropDate: location.state.dropDate,
        dropTime: location.state.dropTime,
        tripType: TRANSPORT_TYPE.BUS,
        tripPrice: location.state.totalPrice + BUS_TAX,
      },
      busId: location.state.busId,
      userId: mainContext.loginDetails.userId,
      paymentStatus: true,
      razorpayPaymentId: "test_payment_001",
      bookedDate: "",
      bookedTime: "",
    };
    const result = handleBusPaymentApiCall(data);
    result
      .then((res) => {
        if (res) {
          alert("Bus Booked Successfully");
        }
      })
      .catch((res) => {
        alert("Bus Booking Failed");
      });
  };
  // console.log("state", mainContext.loginDetails.userId);
  return (
    <div className="BusBooking" onLoad={mainContext.handleOnLoad}>
      <nav className="bus-booking-navbar">
        <div className="bus-booking-navbar-cotent">
          <h2>Complete your booking</h2>
          <p>{`${location.state.fromPlace} to ${location.state.toPlace} | ${
            location.state.formattedPickUpDateTime.split(" - ")[1]
          } | ${location.state.formattedPickUpDateTime.split(" - ")[0]}`}</p>
        </div>
      </nav>
      <div className="bus-booking-container container">
        <div className="bus-booking-container-1">
          <div className="bus-booking-container-1-1">
            <div className="bus-booking-container-1-1-1">
              <div className="flex-wrapper">
                <h2>{location.state.busName}</h2>
                <p>{location.state.busType + " " + location.state.seatType}</p>
                <p>{location.state.rating}</p>
              </div>
              <div className="flex-wrapper">
                <p>{location.state.selectedSeatNoList}</p>
              </div>
            </div>
            <div className="bus-booking-container-1-1-2">
              <p>{location.state.formattedPickUpDateTime}</p>
              <p>{location.state.duration}</p>
              <p>{location.state.formattedDropDateTime}</p>
            </div>
            <div className="bus-booking-container-1-1-3">
              <p>{location.state.pickUpPlace}</p>
              <p>{location.state.dropPlace}</p>
            </div>
          </div>
          <div className="bus-booking-container-1-2">
            <h2>Traveller Details</h2>
            {location.state.selectSeat.selectedSeatDetailsList.map(
              (seat, index) => {
                return (
                  <div className="traveller-detils-wrapper">
                    <p className="seat-no-text">
                      Seat {selectedSeatNoListNum[index]}
                    </p>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Name</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Traveller Name"
                        value={bookingData.travellersDetails[index].name}
                        onChange={(e) => handleTravellersOnChange(e, index)}
                      />
                    </div>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Age</label>
                      <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        value={bookingData.travellersDetails[index].age}
                        onChange={(e) => handleTravellersOnChange(e, index)}
                      />
                    </div>
                    <div className="input-box-wrapper">
                      <label htmlFor="">Gender</label>
                      <div className="gender-choise-wrapper">
                        <span
                          className={`${
                            bookingData.travellersDetails[index].gender ===
                            "male"
                              ? `selected-gender`
                              : ``
                          }`}
                          onClick={() => handleSelectGender(index, "male")}
                        >
                          Male
                        </span>
                        <span
                          className={`${
                            bookingData.travellersDetails[index].gender ===
                            "female"
                              ? `selected-gender`
                              : ``
                          }`}
                          onClick={() => handleSelectGender(index, "female")}
                        >
                          Female
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className="bus-booking-container-1-3">
            <h2>Contact Details</h2>
            <div className="bus-booking-container-1-3-content">
              <dir className="input-box-wrapper">
                <label htmlFor="">Email Id</label>
                <input
                  type="text"
                  name="emailId"
                  id=""
                  placeholder="abc@gmailcom"
                  value={bookingData.contactDetails.emailId}
                  onChange={handleContactDetailsOnChange}
                />
              </dir>
              <dir className="input-box-wrapper">
                <label htmlFor="">Mobile No</label>
                <input
                  type="number"
                  name="mobileNo"
                  id=""
                  placeholder="Type here..."
                  maxLength={10}
                  value={bookingData.contactDetails.mobileNo}
                  onChange={handleContactDetailsOnChange}
                />
              </dir>
            </div>
          </div>
        </div>
        <div className="bus-booking-container-2">
          <h3>Price Detalis</h3>
          <div className="bus-booking-container-2-1">
            <label>Base Fare</label>
            <p>Rs.{location.state.totalPrice}</p>
          </div>
          <div className="bus-booking-container-2-2">
            <label>Tax</label>
            <p>Rs.{BUS_TAX}</p>
          </div>
          <div className="bus-booking-container-2-3">
            <label htmlFor="">Total Amount</label>
            <p>Rs.{location.state.totalPrice + BUS_TAX}</p>
          </div>
          <button
            className="continue-btn"
            onClick={() => {
              handlePayment(
                location.state.totalPrice + BUS_TAX,
                handlePaymentCallBack
              );
            }}
            // onClick={handleApiCall}
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;

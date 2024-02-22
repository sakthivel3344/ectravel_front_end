import React, { useState } from "react";
import "./FlightBooking.scss";
import PaymentButton from "../../../../shared/PaymentButton";
import FlightBookingDetails from "./FlightBookingDetails";
import {
  FEMALE,
  FLIGHT_CLASS_TYPE,
  MALE,
  TRANSPORT_TYPE,
} from "../../../../constants/stringConstants";
import {
  contactDetailsForm,
  travellerDetailsForm,
} from "../../../../constants/formConstants";
import BookingInputBox from "../../../../shared/BookingInputBox";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calcDuration,
  monthNoToMonthStr,
} from "../../../../utils/TicketBooking";
import { handlePayment } from "../../../../utils/payment";
import DropDown from "../../../../components/DropDown";
import { useMain } from "../../../../contexts/MainContext";
import {
  handleFlightPaymentApiCall,
  handleGetAvailFlightApiCall,
} from "../../../../utils/ApiCalls";
import { FLIGHT_TAX } from "../../../../constants/taxConstants";

const FlightBooking = () => {
  const mainContext = useMain();
  const classList = ["Business", "Economy"];
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    emailId: "",
    mobileNo: "",
    selectedClass: classList[0],
  });
  const { flightData } = location.state;
  const handleSelectGenderOnClick = (clickedOption) => {
    setFormData({
      ...formData,
      gender: clickedOption,
    });
  };
  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(location.state);

  const handlePaymentCallBack = (response) => {
    // console.log(response.razorpay_payment_id);
    const dateObj = new Date();
    let seatClassName =
      formData.selectedClass === "Business"
        ? FLIGHT_CLASS_TYPE.BUSINESS_CLASS
        : FLIGHT_CLASS_TYPE.ECONOMY_CLASS;
    let dataObj = {
      passengerDetails: {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
      },
      contactDetails: {
        emailId: formData.emailId,
        mobileNo: formData.mobileNo,
      },
      tripDetails: {
        fromPlace: location.state.fromPlace,
        toPlace: location.state.toPlace,
        pickUpDate: flightData.pickUpDate,
        pickUpTime: flightData.pickUpTime,
        dropDate: flightData.dropDate,
        dropTime: flightData.dropTime,
        tripType: TRANSPORT_TYPE.FLIGHT,
        tripPrice: Number(flightData.price) + FLIGHT_TAX,
      },
      classType: seatClassName,
      flightId: flightData.flightId,
      userId: mainContext.loginDetails.userId,
      paymentStatus: true,
      razorpayPaymentId: response.razorpay_payment_id,
      bookedDate: dateObj.toISOString().split("T")[0],
      bookedTime: dateObj.getHours() + ":" + dateObj.getMinutes(),
    };
    const result = handleFlightPaymentApiCall(dataObj);
    result.then((res) => {
      if (res) {
        alert("Payment Successful");

        let dataObj = {
          fromPlace: location.state.fromPlace,
          toPlace: location.state.toPlace,
          pickUpDate: location.state.date,
        };

        let response = handleGetAvailFlightApiCall(dataObj);
        response.then((res) => {
          const data = {
            fromPlace: dataObj.fromPlace,
            toPlace: dataObj.toPlace,
            date: dataObj.pickUpDate,
            data: res.data,
          };
          navigate("/services/availFlight", { state: data });
        });
      } else {
        alert("Payment Failed");
      }
    });
  };

  const handleApiCall = () => {
    const dateObj = new Date();
    let seatClassName =
      formData.selectedClass === "Business"
        ? FLIGHT_CLASS_TYPE.BUSINESS_CLASS
        : FLIGHT_CLASS_TYPE.ECONOMY_CLASS;
    let dataObj = {
      passengerDetails: {
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
      },
      contactDetails: {
        emailId: formData.emailId,
        mobileNo: formData.mobileNo,
      },
      tripDetails: {
        fromPlace: location.state.fromPlace,
        toPlace: location.state.toPlace,
        pickUpDate: flightData.pickUpDate,
        pickUpTime: flightData.pickUpTime,
        dropDate: flightData.dropDate,
        dropTime: flightData.dropTime,
        tripType: TRANSPORT_TYPE.FLIGHT,
        tripPrice: Number(flightData.price) + FLIGHT_TAX,
      },
      classType: seatClassName,
      flightId: flightData.flightId,
      userId: mainContext.loginDetails.userId,
      paymentStatus: true,
      razorpayPaymentId: "flight_payment_test_001",
      bookedDate: dateObj.toISOString().split("T")[0],
      bookedTime: dateObj.getHours() + ":" + dateObj.getMinutes(),
    };
    const result = handleFlightPaymentApiCall(dataObj);
    result.then((res) => {
      if (res) {
        alert("Payment Successful");
        let dataObj = {
          fromPlace: location.state.fromPlace,
          toPlace: location.state.toPlace,
          pickUpDate: location.state.date,
        };
        let response = handleGetAvailFlightApiCall(dataObj);
        response.then((res) => {
          const data = {
            fromPlace: dataObj.fromPlace,
            toPlace: dataObj.toPlace,
            date: dataObj.pickUpDate,
            data: res.data,
          };
          // navigate("/services/availTrain", { state: data });
          navigate("/services/availFlight", { state: data });
        });
      } else {
        alert("Payment Failed");
      }
    });
  };
  // console.log("-->",location.state);
  const handleSetClassType = (value) => {
    setFormData({
      ...formData,
      selectedClass: value,
    });
  };
  return (
    <div className="FlightBooking">
      <nav className="navbar">
        <div className="navbar-content">
          <h2>Complete your booking</h2>
          <p className="basic-details">
            {location.state.fromPlace +
              " to " +
              location.state.toPlace +
              " | " +
              location.state.date.split("-")[2] +
              " " +
              monthNoToMonthStr(location.state.date.split("-")[1])}
          </p>
        </div>
      </nav>
      <div className="flight-booking-content">
        <div className="flight-content-1">
          <div className="flight-detail flight-detail-1">
            {/* <div className="flight-detail-1-border-wrapper"> */}
            <div className="wrapper-1">
              <div className="wrapper-1-1">
                <p className="from-to-title">
                  {`${location.state.fromPlace} → ${location.state.toPlace}`}{" "}
                </p>
                <p>
                  {location.state.flightData.stopping === ""
                    ? "Non Stop"
                    : "1 Stop"}
                </p>
              </div>
              <p>{`${
                monthNoToMonthStr(location.state.date.split("-")[1]) +
                " " +
                location.state.date.split("-")[2] +
                " · " +
                calcDuration(
                  flightData.pickUpDate,
                  flightData.dropDate,
                  flightData.pickUpTime,
                  flightData.dropTime
                )
              }`}</p>
            </div>
            {location.state.flightData.stopping === "" ? (
              <FlightBookingDetails
                data={location.state}
                pickUpDate={flightData.pickUpDate}
                pickUpTime={flightData.pickUpTime}
                dropDate={flightData.dropDate}
                dropTime={flightData.dropTime}
                fromPlace={location.state.fromPlace}
                toPlace={location.state.toPlace}
              />
            ) : (
              <>
                <FlightBookingDetails
                  data={location.state}
                  pickUpDate={flightData.pickUpDate}
                  pickUpTime={flightData.pickUpTime}
                  dropDate={flightData.stoppingDate}
                  dropTime={flightData.stoppingTime}
                  fromPlace={location.state.fromPlace}
                  toPlace={flightData.stopping}
                />
                <FlightBookingDetails
                  data={location.state}
                  pickUpDate={flightData.stoppingDate}
                  pickUpTime={flightData.stoppingTime}
                  dropDate={flightData.dropDate}
                  dropTime={flightData.dropTime}
                  fromPlace={flightData.stopping}
                  toPlace={location.state.toPlace}
                />
              </>
            )}
            {/* </div> */}
          </div>
          <div className="flight-detail flight-detail-2">
            <h2>Traveller Details</h2>
            <div className="traveller-form-wrapper">
              {travellerDetailsForm.map((inputBoxData) => {
                return (
                  <div className="input-box-wrapper" key={inputBoxData.id}>
                    <label>{inputBoxData.label}</label>
                    <BookingInputBox
                      className=""
                      name={inputBoxData.name}
                      type={inputBoxData.type}
                      placeHolder={inputBoxData.placeHolder}
                      value={formData[inputBoxData.name]}
                      handleOnChange={handleInputOnChange}
                    />
                  </div>
                );
              })}
              {/* <DropDown/> */}
              <div className="input-box-wrapper">
                <label>Class Type</label>
                <DropDown
                  className="classDropDown"
                  state={formData?.selectedClass}
                  setState={handleSetClassType}
                  dropDownList={classList}
                />
              </div>
              <div className="input-box-wrapper">
                <label>Gender</label>
                <div className="gender-selector">
                  <span
                    className={`gender-option gender-option-1 ${
                      formData.gender === MALE && "selected-gender"
                    }`}
                    onClick={() => handleSelectGenderOnClick(MALE)}
                  >
                    Male
                  </span>
                  <span
                    className={`gender-option gender-option-2 ${
                      formData.gender === FEMALE && "selected-gender"
                    }`}
                    onClick={() => handleSelectGenderOnClick(FEMALE)}
                  >
                    Female
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flight-detail flight-detail-3">
            <h2>Contact Details</h2>

            <div className="traveller-form-wrapper">
              {contactDetailsForm.map((inputBoxData) => {
                return (
                  <div className="input-box-wrapper" key={inputBoxData.id}>
                    <label>{inputBoxData.label}</label>
                    <BookingInputBox
                      className=""
                      name={inputBoxData.name}
                      type={inputBoxData.type}
                      placeHolder={inputBoxData.placeHolder}
                      value={formData[inputBoxData.name]}
                      handleOnChange={handleInputOnChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flight-content-2">
          <p className="price-detail price-detail-1">Fare Summary</p>
          <div className="price-detail price-detail-2">
            <p className="price-label">Base Fare</p>
            <p className="price-text">Rs.{flightData.price}</p>
          </div>
          <div className="price-detail price-detail-3">
            <p className="price-label">Taxes and Surcharges</p>
            <p className="price-text">Rs.{FLIGHT_TAX}</p>
          </div>
          <div className="price-detail price-detail-4">
            <p className="price-label">Total Amount</p>
            <p className="price-text">
              Rs.{Number(flightData.price) + FLIGHT_TAX}
            </p>
          </div>
          <PaymentButton
            className="flight-pay-now-btn"
            handleOnClick={() =>
              handlePayment(
                Number(flightData.price) + FLIGHT_TAX,
                handlePaymentCallBack
              )
            }
            // handleOnClick={handleApiCall}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;

import React, { useEffect, useState } from "react";
import "./TicketBooking.scss";
import { offers } from "../../../constants/OffersConstant";
import axios, { formToJSON } from "axios";
import API_LINKS from "../../../constants/ApiConstant";
import {
  handleCheckAvailBusApiCall,
  handleGetAvailFlightApiCall,
  handleGetAvailTrainApiCall,
} from "../../../utils/ApiCalls";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../contexts/MainContext";
const TicketBooking = () => {
  const mainContext = useMain();
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    vehicle: "train",
    fromPlace: "Chennai",
    toPlace: "Bangalore",
    date: "2024-01-01",
  });

  const navigate = useNavigate();
  const handleVehicle = (vehicle) => {
    setFormData({ ...formData, ["vehicle"]: vehicle });
  };
  const prevPage = () => {
    if (activeIndex != 0) setActiveIndex(activeIndex - 1);
  };
  const nextPage = () => {
    if (activeIndex != offers.length - 3) setActiveIndex(activeIndex + 1);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    let response, dataObj;
    switch (formData.vehicle) {
      case "flight":
        dataObj = {
          fromPlace: formData.fromPlace,
          toPlace: formData.toPlace,
          pickUpDate: formData.date,
        };
        response = handleGetAvailFlightApiCall(dataObj);
        response.then((res) => {
          const data = {
            fromPlace: formData.fromPlace,
            toPlace: formData.toPlace,
            date: formData.date,
            data: res.data,
          };
          // navigate("/services/availTrain", { state: data });
          navigate("/services/availFlight", { state: data });
        });
        break;
      case "train":
        dataObj = {
          pickUpDate: formData.date,
          fromPlace: formData.fromPlace,
          toPlace: formData.toPlace,
        };
        response = handleGetAvailTrainApiCall(dataObj);
        response.then((res) => {
          const data = {
            data: res.data,
            fromPlace: formData.fromPlace,
            toPlace: formData.toPlace,
            date: formData.date,
          };
          navigate("/services/availTrain", { state: data });
        });
        break;
      case "bus":
        response = handleCheckAvailBusApiCall(formData);
        response.then((res) => {
          const data = {
            data: res.data,
            fromPlace: formData.fromPlace,
            toPlace: formData.toPlace,
            date: formData.date,
          };
          navigate("/services/availBus", { state: data });
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="TicketBooking" onLoad={mainContext.handleOnLoad}>
      <div className="search-bg">
        <div className="ticketbooking-container">
          <div className="ticketbooking-wrapper">
            <div className="search-container">
              <div className="nav-links">
                <div
                  className={`nav-item ${
                    formData.vehicle === "flight" ? "active-vehicle" : ""
                  }`}
                  onClick={() => handleVehicle("flight")}
                >
                  <span className="material-symbols-outlined">flightsmode</span>
                  <p>Flight</p>
                </div>
                <div
                  name="train"
                  className={`nav-item ${
                    formData.vehicle === "train" ? "active-vehicle" : ""
                  }`}
                  onClick={() => handleVehicle("train")}
                >
                  <span className="material-symbols-outlined">train</span>
                  <p>Train</p>
                </div>
                <div
                  name="bus"
                  className={`nav-item ${
                    formData.vehicle === "bus" ? "active-vehicle" : ""
                  }`}
                  onClick={() => handleVehicle("bus")}
                >
                  <span className="material-symbols-outlined">
                    directions_bus
                  </span>
                  <p>Bus</p>
                </div>
              </div>
              <div className="search-content">
                <div className="search-input-wrapper">
                  <div className="input-box-wrapper">
                    <label htmlFor="">From</label>
                    <input
                      name="fromPlace"
                      type="text"
                      placeholder="From"
                      value={formData.fromPlace}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="input-box-wrapper">
                    <label htmlFor="">To</label>
                    <input
                      name="toPlace"
                      type="text"
                      placeholder="To"
                      value={formData.toPlace}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="input-box-wrapper">
                    <label htmlFor="">Date</label>
                    <input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <button className="search-btn" onClick={handleSubmit}>
                SEARCH
              </button>
            </div>
          </div>
          
          {/* Carosel */}
          <div className="offers">
            <span
              className="material-symbols-outlined prev-btn"
              onClick={prevPage}
              style={{ color: activeIndex === 0 ? "lightgrey" : "black" }}
            >
              navigate_before
            </span>
            <div className="offers-wrapper">
              <div
                className="offers-slide-wrapper"
                style={{
                  transform: `translateX(calc(-${activeIndex * 100}% / 3))`,
                }}
              >
                {offers.map((offer) => {
                  return (
                    <div className="offers-slides" key={offer.id}>
                      <div>
                        <img src={offer.img} alt="offer_img" />
                        <div>
                          <p>Place: {offer.place}</p>
                          <p>Discount: {offer.discount}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <span
              className="material-symbols-outlined next-btn"
              onClick={nextPage}
              style={{
                color:
                  activeIndex === offers.length - 3 ? "lightgrey" : "black",
              }}
            >
              navigate_next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBooking;

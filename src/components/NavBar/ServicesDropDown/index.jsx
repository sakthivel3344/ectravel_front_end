import React from "react";
import "./ServicesDropDown.scss";
import { NavLink, useNavigate } from "react-router-dom";
const ServicesDropDown = () => {
  const navigate = useNavigate();
  return (
    <div className="ServicesDropDown">
      <div className="dropdown-content">
        <div className="service-wrapper">
          <NavLink
            activeClass="active-service"
            to="services/tracklocation"
            className="service-link"
          >
            Track Location
          </NavLink>
          <NavLink to="services/ticketbooking" className="service-link">
            Ticket Booking
          </NavLink>
          <NavLink to="" className="service-link">
            Taxi Booking
          </NavLink>
          <NavLink activeClass="active-service" to="services/hotelBooking" className="service-link">
            Hotel Booking
          </NavLink>
          <NavLink to="" className="service-link">
            Food Order
          </NavLink>
          <NavLink to="" className="service-link">
            Tour Planner
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ServicesDropDown;

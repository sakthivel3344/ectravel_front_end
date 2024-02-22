import React, { useEffect, useState } from "react";
import "./AdminSideBar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
const AdminSideBar = () => {
  const [manageBooking, setManageBooking] = useState({
    visible: false,
    selected: "",
  });
  const [activeItem, setActiveItem] = useState("admin");
  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, [window.location.href]);
  const navigate = useNavigate();

  const handleManageBookingOnClick = () => {
    setManageBooking({
      ...manageBooking,
      visible: !manageBooking.visible,
    });
  };

  const handleAdminHomeOnClick = () => {
    navigate("/admin");
  };
  const handleManageUserOnClick = () => {
    navigate("manageUser");
  };
  const handleOnClick = (type) => {
    switch (type) {
      case "admin":
        navigate("/admin");
        break;
      case "manageUser":
        navigate("manageUser");
        break;
      case "manageBooking":
        setManageBooking({
          ...manageBooking,
          visible: !manageBooking.visible,
        });
        break;
      case "manageFlightBooking":
        navigate("manageFlightBooking");
        break;
      case "manageTrainBooking":
        navigate("manageTrainBooking");
        break;
      case "manageBusBooking":
        navigate("manageBusBooking");
        break;
      case "manageHotelBooking":
        navigate("manageHotelBooking");
        break;
      default:
        break;
    }
  };
  return (
    <div className="AdminSideBar">
      <h2 className="logo">Dashboard</h2>
      <ul className="admin-sidebar-item-wrapper">
        <li
          className={`admin-sidebar-item ${
            activeItem.endsWith("admin") || activeItem.endsWith("admin/")
              ? `bg-black`
              : ``
          }`}
          onClick={() => handleOnClick("admin")}
        >
          Home
        </li>
        <li
          className={`admin-sidebar-item ${
            activeItem.endsWith("manageUser") ? `bg-black` : ``
          }`}
          onClick={() => handleOnClick("manageUser")}
        >
          Manage User
        </li>
        <li
          className={`admin-sidebar-item ${
            manageBooking.visible ||
            activeItem.endsWith("manageFlightBooking") ||
            activeItem.endsWith("manageTrainBooking") ||
            activeItem.endsWith("manageBusBooking")
              ? `dropdown-visible`
              : ``
          }`}
          onClick={() => handleOnClick("manageBooking")}
        >
          Manage Booking
          {manageBooking.visible ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </li>
        {manageBooking.visible && (
          <ul className="admin-sidebar-manage-booking-item-wrapper">
            <li
              className={`${
                activeItem.endsWith("manageFlightBooking")
                  ? `active-manage-booking`
                  : ``
              }`}
              onClick={() => handleOnClick("manageFlightBooking")}
            >
              Manage Flight Booking
            </li>
            <li
              className={`${
                activeItem.endsWith("manageTrainBooking")
                  ? `active-manage-booking`
                  : ``
              }`}
              onClick={() => handleOnClick("manageTrainBooking")}
            >
              Manage Train Booking
            </li>
            <li
              className={`${
                activeItem.endsWith("manageBusBooking")
                  ? `active-manage-booking`
                  : ``
              }`}
              onClick={() => handleOnClick("manageBusBooking")}
            >
              Manage Bus Booking
            </li>
          </ul>
        )}
        <li
          className={`admin-sidebar-item ${
            activeItem.endsWith("manageHotelBooking") ? `bg-black` : ``
          }`}
          onClick={() => handleOnClick("manageHotelBooking")}
        >
          Manage Hotel Booking
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;

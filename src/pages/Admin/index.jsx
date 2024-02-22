import React from "react";
import "./Admin.scss";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import TrainFormPopUP from "../../components/TrainFormPopUP";
import AddBusPopUp from "../../components/AddBusPopUp";
import AddFlightPopUp from "../../components/AddFlightPopUp";
import AddHotelFormPopUp from "../../containers/AddHotelFormPopUp";
const Admin = () => {
  const adminContext = useAdmin();
  return (
    <div className="Admin">
        <AdminSideBar />
        <Outlet />
      {adminContext.popUp.addBusPopUp.visible && <AddBusPopUp/>}
      {adminContext.trainFormPopUp.visible && <TrainFormPopUP/>}
      {adminContext.flightPopUp.visible && <AddFlightPopUp/>}
      {adminContext.hotelFormPopUp.visible && <AddHotelFormPopUp/>}
    </div>
  );
};

export default Admin;

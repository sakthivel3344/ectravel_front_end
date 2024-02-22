import React, { useEffect, useState } from "react";
import "./ManageBusBooking.scss";
import "../../../assets/styles/manageStyle.scss";

import {
  handleDeleteBusApiCall,
  handleGetAllBusApiCall,
} from "../../../utils/AdminApiCall";
import { useAdmin } from "../../../contexts/AdminContext";
const ManageBusBooking = () => {
  const adminContext = useAdmin();
  useEffect(() => {
    handleGetAllBus();
  }, []);
  const handleGetAllBus = () => {
    const response = handleGetAllBusApiCall();
    response.then((res) => {
      adminContext.handleSetBusList(res.data);
    });
  };
  const handleDeleteBtn = (busId) => {
    const response = handleDeleteBusApiCall(busId);
    response.then((res) => {
      handleGetAllBus();
    });
  };
  const handleAddBusBtn = () => {
    adminContext.handleSetPopUp({
      ...adminContext.popUp,
      addBusPopUp: {
        ...adminContext.popUp.addBusPopUp,
        visible: true,
      },
    });
  };
  const handleEditBtn = (bus) => {
    adminContext.handleSetPopUp({
      ...adminContext.popUp,
      addBusPopUp: {
        ...adminContext.popUp.addBusPopUp,
        details: bus,
        visible: true,
      },
    });
  };
  return (
    <div className="ManageBusBooking">
      <div className="Manage">
        <div className="manage-header">
          <h2>Manage Bus Booking</h2>
          <button className="add-btn" onClick={handleAddBusBtn}>
            Add Bus
          </button>
        </div>
        <table className="manage-table">
          <thead>
            <th>Bus No</th>
            <th>Bus Name</th>
            <th>Bus Type</th>
            <th>Seat Type</th>
            <th>From</th>
            <th>To</th>
            <th>Pick Up date</th>
            <th>Drop date</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Action</th>
          </thead>
          <tbody>
            {adminContext.busList &&
              adminContext.busList.map((bus, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{bus.busDetails.busName}</td>
                    <td>{bus.busDetails.busType}</td>
                    <td>{bus.busDetails.seatType}</td>
                    <td>{bus.busDetails.fromPlace}</td>
                    <td>{bus.busDetails.toPlace}</td>
                    <td>{bus.busDetails.pickUpDate}</td>
                    <td>{bus.busDetails.dropDate}</td>
                    <td>{bus.busDetails.rating}</td>
                    <td>{bus.busDetails.price}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditBtn(bus)}>Edit</button>{" "}
                      <button
                      className="delete-btn"
                        onClick={() => handleDeleteBtn(bus.busDetails.busId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBusBooking;

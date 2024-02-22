import React, { useEffect, useState } from "react";
import "./ManageFlightBooking.scss";
import {
  handleDeleteFlightApiCall,
  handleDeleteTrainApiCall,
  handleGetAllFlightsApiCall,
} from "../../../utils/AdminApiCall";
import { useAdmin } from "../../../contexts/AdminContext";
const ManageFlightBooking = () => {
  const adminContext = useAdmin();
  const handleAddFlightBtn = () => {
    adminContext.handleSetFlightPopUp({
      ...adminContext.flightPopUp,
      visible: true,
    });
  };
  useEffect(() => {
    handleGetAllFlight();
  }, []);
  const handleGetAllFlight = () => {
    const response = handleGetAllFlightsApiCall();
    response.then((res) => {
      adminContext.handleSetFlightList(res.data);
      console.log(res.data);
    });
  };
  const handleEditBtn = (flight) => {
    adminContext.handleSetFlightPopUp({
      ...adminContext.flightPopUp,
      visible: true,
      data: flight,
    });
  };

  const handleDeleteBtn = (flightId) => {
    const response = handleDeleteFlightApiCall(flightId);
    response.then((res) => {
      if (res) {
        handleGetAllFlight();
      }
    });
  };
  return (
    <div className="ManageFlightBooking">
      <div className="ManageTrainBooking">
        <div className="Manage">
          <div className="manage-header">
            <h2>Manage Flight</h2>
            <button className="add-btn" onClick={handleAddFlightBtn}>
              Add Flight
            </button>
          </div>
          <table className="manage-table">
            <thead>
              <th>Flight No</th>
              <th>Flight Name</th>
              <th>From</th>
              <th>To</th>
              <th>Pick Up date</th>
              <th>Drop date</th>
              <th>Is Meal Free</th>
              <th>Cabin Bag Limit</th>
              <th>Check In Limit</th>
              <th>Price</th>
              <th>Action</th>
            </thead>
            <tbody>
              {adminContext.flightList &&
                adminContext.flightList.map((flight, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{flight.flightName}</td>
                      <td>{flight.fromPlace}</td>
                      <td>{flight.toPlace}</td>
                      <td>{flight.pickUpDate}</td>
                      <td>{flight.dropDate}</td>
                      <td>{flight.mealFree === true ? "Free" : "Paid"}</td>
                      <td>{flight.cabinBagLimit}</td>
                      <td>{flight.checkInLimit}</td>
                      <td>{flight.price}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEditBtn(flight)}
                        >
                          Edit
                        </button>{" "}
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteBtn(flight.flightId)}
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
    </div>
  );
};

export default ManageFlightBooking;

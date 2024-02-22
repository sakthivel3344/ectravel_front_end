import React, { useEffect } from "react";
import "./ManageTrainBooking.scss";
import "../../../assets/styles/manageStyle.scss";
import {
  handleDeleteTrainApiCall,
  handleGetAllTrainApiCall,
} from "../../../utils/AdminApiCall";
import { useAdmin } from "../../../contexts/AdminContext";

const ManageTrainBooking = () => {
  const adminContext = useAdmin();
  useEffect(() => {
    handleGetAllTrain();
  }, []);
  const handleGetAllTrain = () => {
    const response = handleGetAllTrainApiCall();
    response.then((res) => {
      adminContext.handleSetTrainList(res.data);
    });
  };
  const handleAddBusBtn = () => {
    adminContext.handleSetTrainFormPopUp({
      ...adminContext.trainFormPopUp,
      visible: true,
    });
  };
  const handleEditBtn = (train) => {
    adminContext.handleSetTrainFormPopUp({
      ...adminContext.trainFormPopUp,
      visible: true,
      details: train,
    });
  };
  const handleDeleteBtn = (trainId) => {
    const response = handleDeleteTrainApiCall(trainId);
    response.then((res) => {
      handleGetAllTrain();
    });
  };
  return (
    <div className="ManageTrainBooking">
      <div className="Manage">
        <div className="manage-header">
          <h2>Manage Train</h2>
          <button className="add-btn" onClick={handleAddBusBtn}>
            Add Train
          </button>
        </div>
        <table className="manage-table">
          <thead>
            <th>Train No</th>
            <th>Train Name</th>
            <th>From</th>
            <th>To</th>
            <th>Pick Up date</th>
            <th>Drop date</th>
            <th>Rating</th>
            <th>Seat Details</th>
            <th>Action</th>
          </thead>
          <tbody>
            {adminContext.trainList &&
              adminContext.trainList.map((train, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{train.train.trainName}</td>
                    <td>{train.train.fromPlace}</td>
                    <td>{train.train.toPlace}</td>
                    <td>{train.train.pickUpDate}</td>
                    <td>{train.train.dropDate}</td>
                    <td>{train.train.rating}</td>
                    <td>
                      <button className="view-btn">view</button>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditBtn(train)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteBtn(train.train.trainId)}
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

export default ManageTrainBooking;

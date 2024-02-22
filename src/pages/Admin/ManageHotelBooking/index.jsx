import React, { useEffect } from "react";
import "./ManageHotelBooking.scss";
import { useAdmin } from "../../../contexts/AdminContext";
import { handleGetAllHotelApiCall } from "../../../utils/AdminApiCall";
import CustomButton from "../../../components/CustomButton";

const ManageHotelBooking = () => {
  const adminContext = useAdmin();
  const handleAddHotelBtn = () => {

  }
  const handleViewBtnClick = () => {

  }
  const handleEditBtn = () => {

  }
  const handleDeleteBtn = () => {

  }
  useEffect(() => {
    const response = handleGetAllHotelApiCall();
    response.then(res => {
      // console.log(res);
      if(res.status === 200){
        adminContext.handleSetHotelList(res.data);
      }
    })
  },[]);
  return (
    <div className="ManageHotelBooking">
      <div className="Manage">
        <div className="manage-header">
          <h2>Manage Hotel</h2>
          <button className="add-btn" onClick={handleAddHotelBtn}>
            Add Hotel
          </button>
        </div>
        <table className="manage-table">
          <thead>
            <th>Hotel No</th>
            <th>Hotel Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Description</th>
            <th>Manage Rooms</th>
            <th>Action</th>
          </thead>
          <tbody>
            {adminContext?.hotelList &&
              adminContext?.hotelList.map((hotel, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{hotel.hotelName}</td>
                    <td>{hotel.city}</td>
                    <td>{hotel.state}</td>
                    <td>{hotel.country}</td>
                    <td>{hotel.description}</td>
                    <td>
                    <button className="view-btn" onClick={handleViewBtnClick}>view</button>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditBtn(hotel)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteBtn(hotel.flightId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <CustomButton type="submit" value="Submit"/>
      </div>
    </div>
  );
};

export default ManageHotelBooking;

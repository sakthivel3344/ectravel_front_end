import React from "react";
import "./AddHotelFormPopUp.scss";
import { useAdmin } from "../../contexts/AdminContext";

const formList = [
  {
    id:1,
    type: "text",
    placeHolder: "",
    label: "Hotel Name"
  }
]
const AddHotelFormPopUp = () => {
  const adminContext = useAdmin();
  const handleClose = () => {
    adminContext.handleSetHotelFormPopUp({
      ...adminContext.hotelFormPopUp,
      visible: false,
    })
  }
  return <div className="AddHotelFormPopUp">
      <div className="hotel-form-container">
        <div className="form-head-container">
          <p>Add Hotel</p>
          <span className="material-symbols-outlined close-icon" onClick={handleClose}>close</span>
        </div>
        <div className="form-content-container">
          {
            formList.map(data => {
              return <div className="input-box-wrapper">
                <label htmlFor="">{data.label}</label>
                <input type={data.type} />
              </div>
            })
          }
        </div>
      </div>
    </div>;
};

export default AddHotelFormPopUp;

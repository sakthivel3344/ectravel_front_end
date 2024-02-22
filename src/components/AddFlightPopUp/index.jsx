import React, { useEffect, useState } from "react";
import "./AddFlightPopUp.scss";
import { flightForm } from "../../constants/flightForm";
import { DATE_AND_TIME, RADIO, TEXT } from "../../constants/inputType";
import {
  handleAddFlightApiCall,
  handleGetAllFlightsApiCall,
  handleUpdateBusApiCall,
  handleUpdateFlightApiCall,
} from "../../utils/AdminApiCall";
import { useAdmin } from "../../contexts/AdminContext";
import CustomButton from "../CustomButton";

const AddFlightPopUp = () => {
  const adminContext = useAdmin();
  const [isThereStopping, setIsThereStopping] = useState(false);
  const [formData, setFormData] = useState({
    flightId: null,
    flightName: "",
    fromPlace: "",
    toPlace: "",
    pickUpDateAndTime: "",
    dropDateAndTime: "",
    isMealFree: true,
    price: "",
    businessAvailCount: "",
    economyAvailCount: "",
    cabinBagLimit: "",
    checkInLimit: "",
    stoppingDateAndTime: "",
    stopping: "",
  });

  const handleStoppingOnClick = (e) => {
    const { id } = e.target;
    if (id === "yes") {
      setIsThereStopping(true);
    } else {
      setIsThereStopping(false);
      setFormData({
        ...formData,
        stopping: "",
        stoppingDateAndTime: "",
      });
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleMealOnClick = (e) => {
    const { name, id } = e.target;
    setFormData({
      ...formData,
      [name]: id === "free" ? true : false,
    });
  };

  const handleSubmitBtn = () => {
    let dataObj = {
      flightName: formData.flightName,
      fromPlace: formData.fromPlace,
      toPlace: formData.toPlace,
      mealFree: formData.isMealFree,
      price: formData.price,
      availCount: formData.availCount,
      cabinBagLimit: formData.cabinBagLimit,
      checkInLimit: formData.checkInLimit,
      stopping: formData.stopping,
      pickUpDate: "",
      pickUpTime: "",
      dropDate: "",
      dropTime: "",
      stoppingDate: "",
      stoppingTime: "",
      businessAvailCount: Number(formData.businessAvailCount),
      economyAvailCount: Number(formData.economyAvailCount),
    };
    // console.log("data",dataObj);
    // return;
    if (formData.pickUpDateAndTime !== "") {
      dataObj.pickUpDate = formData.pickUpDateAndTime.split("T")[0];
      dataObj.pickUpTime = formData.pickUpDateAndTime.split("T")[1];
    }

    if (formData.dropDateAndTime !== "") {
      dataObj.dropDate = formData.dropDateAndTime.split("T")[0];
      dataObj.dropTime = formData.dropDateAndTime.split("T")[1];
    }

    if (formData.stoppingDateAndTime !== "") {
      dataObj.stoppingDate = formData.stoppingDateAndTime.split("T")[0];
      dataObj.stoppingTime = formData.stoppingDateAndTime.split("T")[1];
    }
    let response;
    if (adminContext.flightPopUp.data === null) {
      response = handleAddFlightApiCall(dataObj);
    } else {
      dataObj.flightId = formData.flightId;
      response = handleUpdateFlightApiCall(dataObj);
    }
    response.then((res) => {
      if (res) {
        const result = handleGetAllFlightsApiCall();
        result.then((flightList) => {
          adminContext.handleSetFlightList(flightList.data);
        });
        adminContext.handleSetFlightPopUp({
          ...adminContext.flightPopUp,
          visible: false,
          data: null,
        });
      }
    });
  };
  const resetForm = () => {
    setFormData({
      flightId: null,
      flightName: "",
      fromPlace: "",
      toPlace: "",
      pickUpDateAndTime: "",
      dropDateAndTime: "",
      isMealFree: true,
      price: "",
      availCount: "",
      cabinBagLimit: "",
      checkInLimit: "",
      stoppingDateAndTime: "",
      stopping: "",
      businessAvailCount:"",
      economyAvailCount:"",
    });
  };

  const handleClose = (e) => {
    const { className } = e.target;
    if (className === "AddFlightPopUp" || className.includes("close-icon")) {
      adminContext.handleSetFlightPopUp({
        ...adminContext.flightPopUp,
        visible: false,
        data: null,
      });
      resetForm();
    }
  };

  useEffect(() => {
    if (adminContext.flightPopUp.data !== null) {
      const data = adminContext.flightPopUp.data;
      setFormData({
        flightId: data.flightId,
        flightName: data.flightName,
        fromPlace: data.fromPlace,
        toPlace: data.toPlace,
        pickUpDateAndTime: data.pickUpDate + "T" + data.pickUpTime,
        dropDateAndTime: data.dropDate + "T" + data.dropTime,
        isMealFree: data.mealFree,
        price: data.price,
        availCount: data.availCount,
        cabinBagLimit: data.cabinBagLimit,
        checkInLimit: data.checkInLimit,
        stoppingDateAndTime:
          data.stopping !== ""
            ? data.stoppingDate + "T" + data.stoppingTime
            : "",
        stopping: data.stopping,
        businessAvailCount: data.businessAvailCount,
        economyAvailCount: data.economyAvailCount,
      });
      setIsThereStopping(data.stopping !== "");
    }
  }, []);
  return (
    <div className="AddFlightPopUp" onClick={handleClose}>
      <div className="form-container">
        <div className="form-header">
          <h2>
            {adminContext.flightPopUp.data === null ? "Add" : "Update"} Flight
          </h2>
          <span className="material-symbols-outlined close-icon">close</span>
        </div>
        <form className="add-train-form">
          <div className="form-left-side">
            {flightForm.map((formInput) => {
              switch (formInput.type) {
                case TEXT:
                  return (
                    <div className="input-box-wrapper">
                      <label className="flight-form-label">
                        {formInput.labelName}
                      </label>
                      <input
                        type="text"
                        name={formInput.name}
                        className="input-box"
                        value={formData[formInput.name]}
                        onChange={handleOnChange}
                      />
                    </div>
                  );
                case RADIO:
                  return (
                    <div className="input-box-wrapper">
                      <label className="flight-form-label">
                        {formInput.labelName}
                      </label>
                      <div className="radio-input">
                        <input
                          type="radio"
                          id="free"
                          name="isMealFree"
                          checked={formData.isMealFree}
                          onClick={handleMealOnClick}
                        />
                        <label className="first-label">Free</label>
                        <input
                          type="radio"
                          id="paid"
                          name="isMealFree"
                          checked={!formData.isMealFree}
                          onClick={handleMealOnClick}
                        />
                        <label>Paid</label>
                      </div>
                    </div>
                  );
                case DATE_AND_TIME:
                  return (
                    <div className="input-box-wrapper">
                      <label className="flight-form-label">
                        {formInput.labelName}
                      </label>
                      <input
                        type="datetime-local"
                        className="input-box"
                        name={formInput.name}
                        value={formData[formInput.name]}
                        onChange={handleOnChange}
                      />
                    </div>
                  );
                default:
                  break;
              }
            })}
          </div>
          <div className="form-right-side">
            <div className="input-box-wrapper">
              <label className="flight-form-label">Is there stopping</label>
              <div className="radio-input">
                <input
                  id="yes"
                  type="radio"
                  name="stopping"
                  onClick={(e) => handleStoppingOnClick(e)}
                  checked={isThereStopping}
                />
                <label className="first-label">Yes</label>
                <input
                  id="no"
                  type="radio"
                  name="stopping"
                  onClick={(e) => handleStoppingOnClick(e)}
                  checked={!isThereStopping}
                />
                <label>No</label>
              </div>
            </div>
            <div className={isThereStopping ? "visible" : "hidden"}>
              <div className="input-box-wrapper">
                <label className="flight-form-label">Stopping Name</label>
                <input
                  type="text"
                  name="stopping"
                  value={formData.stopping}
                  className="input-box"
                  onChange={handleOnChange}
                />
              </div>
              <div className="input-box-wrapper">
                <label className="flight-form-label">
                  Stopping date & time
                </label>
                <input
                  type="datetime-local"
                  name="stoppingDateAndTime"
                  value={formData.stoppingDateAndTime}
                  className="input-box"
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>
        </form>
        <CustomButton 
          type="submit" 
          value={adminContext.flightPopUp.data === null ? "Submit" : "Update"} 
          onClick={handleSubmitBtn}
          customClassName="flight-submit-btn"
        />
        {/* <button type="button" className="submit-btn" onClick={handleSubmitBtn}>
          {adminContext.flightPopUp.data === null ? "Submit" : "Update"}
        </button> */}
      </div>
    </div>
  );
};

export default AddFlightPopUp;

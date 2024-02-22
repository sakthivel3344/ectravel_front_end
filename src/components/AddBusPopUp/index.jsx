import React, { useEffect, useRef, useState } from "react";
import "./AddBusPopUp.scss";
import {
  handleGetAllBusApiCall,
  handleUpdateBusApiCall,
} from "../../utils/AdminApiCall";
import { handleAddBusApiCall } from "../../utils/ApiCalls";
import { useAdmin } from "../../contexts/AdminContext";

const AddBusPopUp = () => {
  const [formData, setFormData] = useState({
    busId: "",
    busName: "",
    fromPlace: "",
    toPlace: "",
    price: "",
    busType: "AC",
    seatType: "seater",
    pickUpDateTime: "",
    dropDateTime: "",
    rating: "",
  });
  const adminContext = useAdmin();
  const [pickUps, setPickUps] = useState([]);
  const [drops, setDrops] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPickup = () => {
    const arr = [...pickUps, { place: "", time: "" }];
    setPickUps(arr);
  };
  const handlePickUpChange = (e, index) => {
    const { type, value } = e.target;
    const arr = [...pickUps];
    if (type === "text") arr[index] = { ...arr[index], place: value };
    else arr[index] = { ...arr[index], time: value };
    setPickUps(arr);
  };
  const handlePickUpDelete = (index) => {
    let arr = [...pickUps];
    arr = arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
    setPickUps(arr);
  };

  // Drop
  const handleAddDrop = () => {
    const arr = [...drops, { place: "", time: "" }];
    setDrops(arr);
  };
  const handleDropChange = (e, index) => {
    const { type, value } = e.target;
    const arr = [...drops];
    if (type === "text") arr[index] = { ...arr[index], place: value };
    else arr[index] = { ...arr[index], time: value };
    setDrops(arr);
  };
  const handleGetAllBus = () => {
    const response = handleGetAllBusApiCall();
    response.then((res) => {
      adminContext.handleSetBusList(res.data);
    });
  };
  const handleDropDelete = (index) => {
    let arr = [...drops];
    arr = arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
    setDrops(arr);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adminContext.popUp.addBusPopUp.details === null) {
      const dataObj = {
        busName: formData.busName,
        fromPlace: formData.fromPlace,
        toPlace: formData.toPlace,
        price: formData.price,
        busType: formData.busType,
        seatType: formData.seatType,
        pickUpDate: formData.pickUpDateTime.split("T")[0],
        pickUpTime: formData.pickUpDateTime.split("T")[1],
        dropDate: formData.dropDateTime.split("T")[0],
        dropTime: formData.dropDateTime.split("T")[1],
        rating: formData.rating,
        pickUps: pickUps,
        drops: drops,
      };
      const response = handleAddBusApiCall(dataObj);
      response.then((res) => {
        resetForm();
        handleGetAllBus();
        adminContext.handleSetPopUp({
          ...adminContext.popUp,
          addBusPopUp: {
            ...adminContext.popUp.addBusPopUp,
            visible: false,
            details: null,
          },
        });
      });
    } else {
      const busDetails = {
        busId: formData.busId,
        busName: formData.busName,
        fromPlace: formData.fromPlace,
        toPlace: formData.toPlace,
        price: formData.price,
        busType: formData.busType,
        seatType: formData.seatType,
        pickUpDate: formData.pickUpDateTime.split("T")[0],
        pickUpTime: formData.pickUpDateTime.split("T")[1],
        dropDate: formData.dropDateTime.split("T")[0],
        dropTime: formData.dropDateTime.split("T")[1],
        rating: formData.rating,
      };
      const dataObj = {
        busDetails: busDetails,
        busPickUpList: pickUps,
        busDropList: drops,
      };
      const response = handleUpdateBusApiCall(dataObj);
      response.then((res) => {
        resetForm();
        handleGetAllBus();
        adminContext.handleSetPopUp({
          ...adminContext.popUp,
          addBusPopUp: {
            ...adminContext.popUp.addBusPopUp,
            visible: false,
            details: null,
          },
        });
      });
    }
  };
  const resetForm = () => {
    setFormData({
      busId: "",
      busName: "",
      fromPlace: "",
      toPlace: "",
      price: "",
      busType: "AC",
      seatType: "seater",
      pickUpDateTime: "",
      dropDateTime: "",
      rating: "",
    });
    setPickUps([]);
    setDrops([]);
  };
  useEffect(() => {
    if (adminContext.popUp.addBusPopUp.details !== null) {
      const obj = adminContext.popUp.addBusPopUp.details.busDetails;
      setFormData({
        busId: obj.busId,
        busName: obj.busName,
        fromPlace: obj.fromPlace,
        toPlace: obj.toPlace,
        price: obj.price,
        busType: obj.busType,
        seatType: obj.seatType,
        pickUpDateTime: obj.pickUpDate + "T" + obj.pickUpTime,
        dropDateTime: obj.dropDate + "T" + obj.dropTime,
        rating: obj.rating,
      });
      setPickUps(adminContext.popUp.addBusPopUp.details.busPickUpList);
      setDrops(adminContext.popUp.addBusPopUp.details.busDropList);
    }
  }, []);
  const handleClose = (e) => {
    const { className } = e.target;
    if (className === "AddBusPopUp" || className.includes("close-btn")) {
      resetForm();
      adminContext.handleSetPopUp({
        ...adminContext.popUp,
        addBusPopUp: {
          ...adminContext.popUp.addBusPopUp,
          visible: false,
          details: null,
        },
      });
    }
  };
  // const myRef = useRef();
  // myRef.current
  // console.log(Date());
  return (
    <div className="AddBusPopUp" onClick={handleClose}>
      <form>
        <div className="form-header">
          <h2>
            {adminContext.popUp.addBusPopUp.details === null ? "Add" : "Update"}{" "}
            Bus
          </h2>
          <span className="material-symbols-outlined close-btn">close</span>
        </div>
        <div className="form-flex-wrapper">
          <div className="form-flex-1">
            <input type="text" hidden />
            <div className="input-box-wrapper">
              <label htmlFor="">Bus Name</label>
              <input
                name="busName"
                type="text"
                placeholder="Bus Name"
                value={formData.busName}
                onChange={handleOnChange}
                required
              />
            </div>
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
              <label htmlFor="">Price</label>
              <input
                name="price"
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="">Bus Type</label>
              <select
                name="busType"
                value={formData.busType}
                onChange={handleOnChange}
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="">Seat Type</label>
              <select
                name="seatType"
                value={formData.seatType}
                onChange={handleOnChange}
              >
                <option value="seater">Seater</option>
                <option value="sleeper">Sleeper</option>
              </select>
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="">PickUp Date and Time</label>
              <input
                name="pickUpDateTime"
                type="datetime-local"
                value={formData.pickUpDateTime}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="">Drop Date and Time</label>
              <input
                name="dropDateTime"
                type="datetime-local"
                value={formData.dropDateTime}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-box-wrapper">
              <label htmlFor="">Rating</label>
              <input
                name="rating"
                type="text"
                placeholder="Rating (0 - 5)"
                value={formData.rating}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="form-flex-2-wrapper">
            <div className="form-flex-2">
              <div className="add-btn-wrapper">
                <label htmlFor="">Pickup point </label>
                <button
                  onClick={handleAddPickup}
                  className="add-btn"
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="pickup-wrapper">
                {pickUps.map((data, index) => {
                  return (
                    <div className="pickup-input-wrapper" key={index}>
                      <label htmlFor="">Pickup point {index + 1}</label>
                      <div>
                        <input
                          value={data.place}
                          type="text"
                          placeholder={`Pickup point ${index + 1}`}
                          onChange={(e) => handlePickUpChange(e, index)}
                        />
                        <input
                          type="time"
                          value={data.time}
                          onChange={(e) => handlePickUpChange(e, index)}
                        />
                        <button
                          className="delete-btn"
                          type="button"
                          onClick={() => handlePickUpDelete(index)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="form-flex-2">
              <div className="add-btn-wrapper">
                <label htmlFor="">Drop point </label>
                <button
                  onClick={handleAddDrop}
                  className="add-btn"
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="pickup-wrapper">
                {drops.map((data, index) => {
                  return (
                    <div className="pickup-input-wrapper" key={index}>
                      <label htmlFor="">Drop point {index + 1}</label>
                      <div>
                        <input
                          value={data.place}
                          type="text"
                          placeholder={`Drop point ${index + 1}`}
                          onChange={(e) => handleDropChange(e, index)}
                        />
                        <input
                          type="time"
                          value={data.time}
                          onChange={(e) => handleDropChange(e, index)}
                        />
                        <button
                          className="delete-btn"
                          type="button"
                          onClick={() => handleDropDelete(index)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="submit-btn-wrapper">
          <button className="submit-btn" onClick={handleSubmit}>
            {adminContext.popUp.addBusPopUp.details === null
              ? "Submit"
              : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusPopUp;

import React, { useEffect, useState } from "react";
import "./AddTravellerFormPopUp.scss";
import DropDown from "../DropDown";
import { Popup } from "react-leaflet";
import { useDispatch } from "react-redux";
import {
  addTraveller,
  editTraveller,
} from "../../redux/features/TrainBooking/travellersList";
const AddTravellerFormPopUp = ({
  popUp,
  handleSetPopUp,
  handleSetTravellersList,
  travellersList,
}) => {
  const genderList = ["Male", "Female"];
  const nationalityList = ["Indian"];
  const berthPreferenceList = [
    "Upper",
    "Lower",
    "Side Lower",
    "Side Upper",
    "Middle",
  ];
  const [formData, setFormData] = useState({
    travellerName: "",
    age: "",
    gender: genderList[0],
    nationality: nationalityList[0],
    berthPreference: berthPreferenceList[0],
  });
  const handleSetGender = (value) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };
  const handleSetNationality = (value) => {
    setFormData({
      ...formData,
      nationality: value,
    });
  };
  const handleSetBerth = (value) => {
    setFormData({
      ...formData,
      berthPreference: value,
    });
  };
  const handleClose = () => {
    handleSetPopUp({
      ...popUp,
      visible: false,
      data: null,
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    // if (popUp.data !== null) {
    //   let arr = [...travellersList];
    //   arr[popUp.data.index] = formData;
    //   handleSetTravellersList(arr);
    // } else {
    //   handleSetTravellersList([...travellersList, formData]);
    // }
    if (popUp.data === null) {
      dispatch(addTraveller(formData));
    } else {
      dispatch(editTraveller({ index: popUp.index, travellerData: formData }));
    }
    handleClose();
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (popUp.data !== null) {
      console.log(popUp.data);
      setFormData({
        ...popUp.data,
      });
    }
  }, []);
  return (
    <div className="AddTravellerFormPopUp">
      <form className="add-traveller-form">
        <div className="add-traveller-form-navbar">
          <h2 className="title">Add Travellers</h2>
          <span
            className="material-symbols-outlined close-icon"
            onClick={handleClose}
          >
            close
          </span>
        </div>
        <div className="add-traveller-form-content">
          <div className="input-box-wrapper">
            <label>Name</label>
            <input
              name="travellerName"
              className="input-box"
              type="text"
              placeholder="Enter your name"
              value={formData?.travellerName}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box-wrapper">
            <label>Age</label>
            <input
              name="age"
              className="input-box"
              type="text"
              placeholder="Enter your age"
              value={formData?.age}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-box-wrapper">
            <label>Gender</label>
            <div className="drop-down-wrapper">
              <DropDown
                state={formData?.gender}
                setState={handleSetGender}
                dropDownList={genderList}
              />
            </div>
          </div>
          <div className="input-box-wrapper">
            <label>Nationality</label>
            <div className="drop-down-wrapper">
              <DropDown
                state={formData?.nationality}
                setState={handleSetNationality}
                dropDownList={nationalityList}
              />
            </div>
          </div>
          <div className="input-box-wrapper">
            <label>Berth Preference</label>
            <div className="drop-down-wrapper">
              <DropDown
                state={formData?.berthPreference}
                setState={handleSetBerth}
                dropDownList={berthPreferenceList}
              />
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <button type="button" className="btn close-btn" onClick={handleClose}>
            Close
          </button>
          <button type="button" className="btn add-btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTravellerFormPopUp;

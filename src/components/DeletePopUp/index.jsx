import React from "react";
import "./DeletePopUp.scss";

const DeletePopUp = () => {
  return (
    <div className="DeletePopUp">
      <div className="wrapper">
        <span className="material-symbols-outlined close-btn">close</span>
        <p>Are you sure to delete this?</p>
        <div className="btn-wrapper">
          <button>Cancel</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;

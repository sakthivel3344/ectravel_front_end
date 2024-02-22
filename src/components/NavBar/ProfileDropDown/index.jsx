import React, { useEffect, useState } from "react";
import "./ProfileDropDown.css";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../../contexts/MainContext";
const ProfileDropDown = () => {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.href);
  const mainContext = useMain();
  const handleLogOut = () => {
    mainContext.handleSetLogInDetails({
      ...mainContext.loginDetails,
      emailId: null,
      isLoggedIn: false,
    });
    navigate("/");
  };
  const handleProfileDetails = () => {
    navigate(`/profile`, { state: mainContext.loginDetails.emailId });
  };
  const handleMyTripsOnClick = () => {
    navigate("myTrips");
  };
  useEffect(() => {
    setCurrentPath(window.location.href);
  }, []);
  return (
    <div className="ProfileDropDown">
      <ul>
        {!currentPath.includes("profile") && (
          <li onClick={handleProfileDetails}>Profile details</li>
        )}
        {!currentPath.includes("myTrips") && (
          <li onClick={handleMyTripsOnClick}>My Trips</li>
        )}
        <li onClick={handleLogOut}>Log out</li>
      </ul>
    </div>
  );
};

export default ProfileDropDown;

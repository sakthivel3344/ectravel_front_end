import React, { useEffect, useImperativeHandle, useState } from "react";
import "./NavBar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ServicesDropDown from "./ServicesDropDown";
import profile_pic from "../../assets/images/profile-pic.webp";
import { useMain } from "../../contexts/MainContext";
import ProfileDropDown from "./ProfileDropDown";

const NavBar = () => {
  const [servicesDropDown, setServicesDropDown] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);

  const [currentPath, setCurrentPath] = useState("");
  const mainContext = useMain();
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navigate = useNavigate();
  const handleSignUpBtn = () => {
    navigate("/signup");
  };
  const click = () => {};
  return (
    <div className="NavBar">
      <div className="nav-content container">
        <span className="logo">ECTravel</span>
        <ul className="nav-links">
          <CustomLink to="/" text="Home" path={currentPath} />
          <Link
            onClick={click}
            className={`nav-link service-link ${
              window.location.href.includes("services") ? `active` : ``
            }`}
            onMouseEnter={() => setServicesDropDown(true)}
            onMouseLeave={() => setServicesDropDown(false)}
          >
            Services
            {servicesDropDown && <ServicesDropDown />}
          </Link>
          <CustomLink to="/about" text="About" path={currentPath} />
          {!mainContext.loginDetails.isLoggedIn ? (
            <button className="nav-link sign-in-btn" onClick={handleSignUpBtn}>
              Sign Up
            </button>
          ) : (
            <li
              className="profile-nav-link-wrapper"
              onMouseEnter={() => setProfileDropDown(true)}
              onMouseLeave={() => setProfileDropDown(false)}
            >
              <img
                className="profile-pic"
                loading="lazy"
                src={profile_pic}
                alt="profile"
              />
              {profileDropDown && <ProfileDropDown />}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const CustomLink = ({ to, text, path }) => {
  return (
    <NavLink
      className={"nav-link " + (path.endsWith(to) ? "active-link" : "")}
      to={to}
    >
      {text}
    </NavLink>
  );
};
export default NavBar;

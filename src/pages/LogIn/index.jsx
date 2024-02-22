import React, { useEffect, useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_LINKS from "../../constants/ApiConstant";
import { useMain } from "../../contexts/MainContext";
import { handleUserLogInApiCall } from "../../utils/ApiCalls";

const LogIn = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const mainContext = useMain();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataObj = {
      emailId: formData.emailId,
      password: formData.password,
    };
    const response = handleUserLogInApiCall(dataObj);
    response.then((res) => {
      if (res.data.loginStatus) {
        mainContext.handleSetLogInDetails({
          ...mainContext.loginDetails,
          userId: res.data.userId,
          emailId: res.data.emailId,
          isLoggedIn: res.data.loginStatus,
        });
        navigate("/");
      } else {
        alert("Incorrect emailId or password!!!");
      }
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    mainContext.handleSetLoadingSpinner(true);
    setTimeout(() => {
      mainContext.handleOnLoad();
    }, 2000);
  }, []);
  
  return (
    <div className="LogIn">
      <form className="login-container">
        <h1>Login</h1>
        <div className="input-box-wrapper">
          <input
            name="emailId"
            className="login-input-box"
            type="text"
            value={formData.emailId}
            onChange={handleOnChange}
            required
          />
          <span></span>
          <label>Email ID</label>
        </div>
        <div className="input-box-wrapper">
          <input
            name="password"
            className="login-input-box"
            type="password"
            value={formData.password}
            onChange={handleOnChange}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <Link>Forget password?</Link>
        <input
          className="login-input-box login-submit-btn"
          type="submit"
          onClick={handleSubmit}
        />
        <div className="login-bottom">
          <p>Not have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
    
  );
};

export default LogIn;

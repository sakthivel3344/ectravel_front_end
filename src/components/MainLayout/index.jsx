import React from "react";
import NavBar from "../NavBar";
import "./MainLayout.css";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="MainLayout">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;

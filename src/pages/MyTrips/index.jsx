import React, { useEffect, useState } from "react";
import "./MyTrips.scss";
import { handleGetMyTripsApiCall } from "../../utils/ApiCalls";
import { useMain } from "../../contexts/MainContext";
import DisplayTripDetails from "./DisplayTripDetails";

const MyTrips = () => {
  const mainContext = useMain();
  const [displayList, setDisplayList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    const dateObj = new Date();
    const dataObj = {
      userId: mainContext.loginDetails.userId,
      currentDate: dateObj.toISOString().split("T")[0],
      type: getRequestType(currentPage),
    };
    const response = handleGetMyTripsApiCall(dataObj);
    response.then((res) => {
      if (res) {
        setDisplayList(res.data);
        console.log(res.data);
      }
    });
  }, [currentPage]);

  const getRequestType = (value) => {
    switch (value) {
      case 1:
        return "UPCOMING";
      case 2:
        return "CANCELLED";
      case 3:
        return "COMPLETED";
      default:
        return "";
    }
  };

  const getBgGradientClassName = (currentPage) => {
    switch (currentPage) {
      case 1:
        return "upcoming-bg-gradient";
      case 2:
        return "cancelled-bg-gradient";
      case 3:
        return "completed-bg-gradient";
      default:
        return "";
    }
  };

  const getBgColorClassName = (currentPage) => {
    switch (currentPage) {
      case 1:
        return "upcoming-bg";
      case 2:
        return "cancelled-bg";
      case 3:
        return "completed-bg";
      default:
        return "";
    }
  };
  // const dateObj = new Date();

  // console.log(dateObj.toISOString().split("T")[0]);
  // console.log(dateObj.getHours() + ":" + dateObj.getMinutes());
  return (
    <>
      <div className={"MyTrips " + getBgGradientClassName(currentPage)}>
        <div className="my-trips-container">
          <ul className="my-trips-navbar">
            <li
              className={
                "nav-item nav-item-1 " +
                (currentPage === 1 ? "active " : "") +
                getBgColorClassName(currentPage)
              }
              onClick={() => handlePageChange(1)}
            >
              UPCOMING
            </li>
            <li
              className={
                "nav-item nav-item-2 " +
                (currentPage === 2 ? "active " : "") +
                getBgColorClassName(currentPage)
              }
              onClick={() => handlePageChange(2)}
            >
              CANCELLED
            </li>
            <li
              className={
                "nav-item nav-item-3 " +
                (currentPage === 3 ? "active " : "") +
                getBgColorClassName(currentPage)
              }
              onClick={() => handlePageChange(3)}
            >
              COMPLETED
            </li>
          </ul>
          <div className="my-trip-content">
            <div className="my-trip-content-wrapper">
              {displayList &&
                displayList.map((tripDetails) => {
                  return (
                    <DisplayTripDetails
                      tripData={tripDetails}
                      currentPage={currentPage}
                      bgGradientClassName={getBgGradientClassName(currentPage)}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="background-color-container" />
    </>
  );
};

export default MyTrips;

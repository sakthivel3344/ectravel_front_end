import React, { useEffect, useState } from "react";
import "./AvailBus.scss";
import { useLocation } from "react-router-dom";
import { monthNoToMonthStr } from "../../../../utils/TicketBooking";
import { useMain } from "../../../../contexts/MainContext";
import BusDetails from "../../../../components/BusDetails";
const AvailBus = () => {
  const location = useLocation();
  const mainContext = useMain();
  const [busList, setBusList] = useState(location.state.data);
  const [searchNavFormData, setSearchNavFormData] = useState({
    vehicle: "",
    fromPlace: "",
    toPlace: "",
    date: "",
  });
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState(location.state.data);
  const [filters, setFilters] = useState({
    operators: [],
    selectedOperators: [],
    filteredOperators: [],
  });
  useEffect(() => {
    let operators = [];
    location.state.data.map((bus) => {
      if (operators.indexOf(bus.bus.busName) === -1) {
        operators.push(bus.bus.busName);
      }
    });
    setFilters({
      ...filters,
      operators: operators,
      filteredOperators: operators,
    });
  }, []);
  console.log("filteredBuses", filteredBuses);
  const handleClearAll = () => {
    setFilteredBuses(busList);
    setSelectedFilter([]);
  };
  const filterBus = () => {
    const len = selectedFilter.length;
    let temp;
    let resultBusList;
    switch (len) {
      case 0:
        resultBusList = busList;
        // setFilteredBuses(busList);
        break;
      case 1:
        resultBusList = busList.filter((bus) => {
          if (selectedFilter[0] === "AC" || selectedFilter[0] === "Non-AC") {
            return bus.bus.busType === selectedFilter[0];
          } else {
            return bus.bus.seatType === selectedFilter[0];
          }
        });
        // setFilteredBuses(resultBusList);
        break;
      case 2:
        resultBusList = busList.filter((bus) => {
          if (selectedFilter[0] === "AC" || selectedFilter[0] === "Non-AC") {
            return (
              bus.bus.busType === selectedFilter[0] &&
              bus.bus.seatType === selectedFilter[1]
            );
          } else {
            return (
              bus.bus.busType === selectedFilter[1] &&
              bus.bus.seatType === selectedFilter[0]
            );
          }
        });
        // setFilteredBuses(resultBusList);
        break;
      default:
        resultBusList = busList;
        break;
    }
    filterBusOperator(resultBusList);
  };
  const filterBusOperator = (resultBusList) => {
    let temp =
      resultBusList &&
      resultBusList.filter((bus) =>
        filters.filteredOperators.includes(bus.bus.busName)
      );
    setFilteredBuses(temp);
  };
  const handleFilterBtnClick = (item) => {
    if (selectedFilter.includes(item)) {
      let filter = selectedFilter.filter((ele) => ele !== item);
      setSelectedFilter(filter);
    } else {
      let selectedFilterArr = selectedFilter;
      switch (item) {
        case "AC":
          if (selectedFilterArr.includes("Non-AC")) {
            let filter = selectedFilterArr.filter((ele) => ele !== "Non-AC");
            selectedFilterArr = filter;
          }
          break;
        case "Non-AC":
          if (selectedFilterArr.includes("AC")) {
            let filter = selectedFilterArr.filter((ele) => ele !== "AC");
            selectedFilterArr = filter;
          }
          break;
        case "seater":
          if (selectedFilterArr.includes("sleeper")) {
            let filter = selectedFilterArr.filter((ele) => ele !== "sleeper");
            selectedFilterArr = filter;
          }
          break;
        case "sleeper":
          if (selectedFilterArr.includes("seater")) {
            let filter = selectedFilterArr.filter((ele) => ele !== "seater");
            selectedFilterArr = filter;
          }
          break;
        default:
          break;
      }
      selectedFilterArr = [...selectedFilterArr, item];
      setSelectedFilter(selectedFilterArr);
    }
  };
  const handleOperatorSelect = (e, value) => {
    let selectedOperators = filters.selectedOperators;
    if (
      selectedOperators.length === 0 &&
      filters.filteredOperators.length === filters.operators.length
    ) {
      selectedOperators = [];
    }
    if (e.target.checked) {
      selectedOperators = [...selectedOperators, value];
    } else {
      let temp = selectedOperators.filter(
        (selectedOperator) => selectedOperator !== value
      );
      selectedOperators = temp;
    }
    if (selectedOperators.length === 0) {
      setFilters({
        ...filters,
        selectedOperators: selectedOperators,
        filteredOperators: filters.operators,
      });
    } else {
      setFilters({
        ...filters,
        selectedOperators: selectedOperators,
        filteredOperators: selectedOperators,
      });
    }
  };
  useEffect(() => {
    filterBus();
  }, [selectedFilter, filters]);

  // console.log("filteredBuses", filteredBuses);
  const handleSortSeats = (seatList) => {
    let tempSeatList = [...seatList];
    tempSeatList.sort((a,b) => {
      return a.seatId - b.seatId;
    });
    console.log("tempSeatList",tempSeatList);
    return tempSeatList;
  }
  return (
    <div className="AvailBus" onLoad={mainContext.handleOnLoad}>
      <div className="search-details-container">
        <nav className="bus-booking-navbar">
          <div className="bus-booking-navbar-cotent">
            <h2>Bus booking</h2>
            <p>{`${location.state.fromPlace} to ${location.state.toPlace} | ${
              location.state.date.split("-")[2]
            } ${monthNoToMonthStr(location.state.date.split("-")[1])}`}</p>
          </div>
        </nav>
        <div className="search-details">
          <div className="filter-container">
            <nav className="filter-nav">
              <h3>Filters</h3>
              <p className="clear-all" onClick={handleClearAll}>
                CLEAR ALL
              </p>
            </nav>
            <div className="filter-1">
              <h4>AC</h4>
              <div className="options-wrapper">
                <span
                  className={
                    selectedFilter.includes("AC") ? "active-filter" : ""
                  }
                  onClick={() => handleFilterBtnClick("AC")}
                >
                  AC
                </span>
                <span
                  className={
                    selectedFilter.includes("Non-AC") ? "active-filter" : ""
                  }
                  onClick={() => handleFilterBtnClick("Non-AC")}
                >
                  Non AC
                </span>
              </div>
            </div>
            <div className="filter-2">
              <h4>Seat type</h4>
              <div className="options-wrapper">
                <span
                  className={
                    selectedFilter.includes("sleeper") ? "active-filter" : ""
                  }
                  onClick={() => handleFilterBtnClick("sleeper")}
                >
                  Sleeper
                </span>
                <span
                  className={
                    selectedFilter.includes("seater") ? "active-filter" : ""
                  }
                  onClick={() => handleFilterBtnClick("seater")}
                >
                  Seater
                </span>
              </div>
            </div>
            <div className="filter-3">
              <h4>Travel Operator</h4>
              <div className="options-wrapper">
                <ul>
                  {filters.operators &&
                    filters.operators.map((operator) => {
                      return (
                        <li>
                          <input
                            type="checkbox"
                            onClick={(e) => handleOperatorSelect(e, operator)}
                          />
                          <p>{operator}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="details-container">
            {filteredBuses &&
              filteredBuses.length > 0 &&
              filteredBuses.map((bus) => {
                console.log(bus);
                return (
                  <BusDetails
                    key={bus.bus.busId}
                    busId={bus.bus.busId}
                    busName={bus.bus.busName}
                    rating={bus.bus.rating}
                    price={bus.bus.price}
                    busType={bus.bus.busType}
                    pickUpDate={bus.bus.pickUpDate}
                    pickUpTime={bus.bus.pickUpTime}
                    dropDate={bus.bus.dropDate}
                    dropTime={bus.bus.dropTime}
                    seatList={handleSortSeats(bus.seatList)}
                    seatType={bus.bus.seatType}
                    pickUpList={bus.pickUpList}
                    dropList={bus.dropList}
                    fromPlace={location.state.fromPlace}
                    toPlace={location.state.toPlace}
                    date={location.state.date}
                  />
                );
              })}
            {(!filteredBuses || filteredBuses.length === 0) && (
              <p className="no-result">No result found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailBus;

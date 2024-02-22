import React, { useEffect, useState } from "react";
import "./AvailFlight.scss";
import FlightDetails from "../../../../components/FlightDetails";
import { useLocation } from "react-router-dom";
import { isInRange, monthNoToMonthStr } from "../../../../utils/TicketBooking";

const AvailFlight = () => {
  const location = useLocation();
  // const [flightList, setFlightList] = useState(location.state.data);
  const [departFilterList, setDepartFilterList] = useState([
    {
      id: 1,
      label: "Before 6AM",
      time: "00:01 - 06:00",
      start: 0,
      end: 6,
      iconText: "wb_twilight",
      isSelected: false,
    },
    {
      id: 2,
      label: "6AM - 12PM",
      time: "06:01 - 12:00",
      start: 7,
      end: 12,
      iconText: "sunny",
      isSelected: false,
    },
    {
      id: 3,
      label: "12PM - 6PM",
      time: "12:01 - 18:00",
      start: 13,
      end: 18,
      iconText: "partly_cloudy_day",
      isSelected: false,
    },
    {
      id: 4,
      label: "After 6PM",
      time: "18:01 - 00:00",
      start: 19,
      end: 23,
      iconText: "bedtime",
      isSelected: false,
    },
  ]);
  const [arrivalFilterList, setArrivalFilterList] = useState([
    {
      id: 1,
      label: "Before 6AM",
      time: "00:01 - 06:00",
      start: 0,
      end: 6,
      iconText: "wb_twilight",
      isSelected: false,
    },
    {
      id: 2,
      label: "6AM - 12PM",
      time: "06:01 - 12:00",
      start: 7,
      end: 12,
      iconText: "sunny",
      isSelected: false,
    },
    {
      id: 3,
      label: "12PM - 6PM",
      time: "12:01 - 18:00",
      start: 13,
      end: 18,
      iconText: "partly_cloudy_day",
      isSelected: false,
    },
    {
      id: 4,
      label: "After 6PM",
      time: "18:01 - 00:00",
      start: 19,
      end: 23,
      iconText: "bedtime",
      isSelected: false,
    },
  ]);

  const [airLineList, setAirLineList] = useState([]);
  const [selectedAirLineList, setSelectedAirLineList] = useState([]);
  const [selectedSortByPrice, setSelectedSortByPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 0,
    pointedPrice: 0,
  });
  const [selectedStop, setSelectedStop] = useState([]);
  const [filteredFlightList, setFilteredFlightList] = useState(
    location.state.data
  );
  const [isAllSelected, setIsAllSelected] = useState(false);
  useEffect(() => {
    let tempAirLineList = [];
    let minPrice = Number.MAX_VALUE;
    let maxPrice = Number.MIN_VALUE;
    location.state.data.map((flightData, index) => {
      if (!tempAirLineList.includes(flightData.flightName)) {
        tempAirLineList.push(flightData.flightName);
      }
      if (Number(flightData.price) < minPrice) {
        minPrice = Number(flightData.price);
      }
      if (Number(flightData.price) > maxPrice) {
        maxPrice = Number(flightData.price);
      }
    });
    setAirLineList(tempAirLineList);
    setPriceRange({
      ...priceRange,
      minPrice: minPrice,
      maxPrice: maxPrice,
      // pointedPrice: minPrice + (maxPrice - minPrice) / 2,
      pointedPrice: maxPrice,
    });
  }, []);

  const handleDepartFilterOnClick = (index) => {
    let arr = [...departFilterList];
    arr[index] = {
      ...arr[index],
      isSelected: !arr[index].isSelected,
    };
    setDepartFilterList(arr);
  };
  const handleArrivalFilterOnClick = (index) => {
    let arr = [...arrivalFilterList];
    arr[index] = {
      ...arr[index],
      isSelected: !arr[index].isSelected,
    };
    setArrivalFilterList(arr);
  };

  const handleAirLineFilterOnClick = (selectedAirLineName) => {
    let tempSelectedAirLineList = [...selectedAirLineList];
    if (selectedAirLineName === "All") {
      let isSelected = !isAllSelected;
      setIsAllSelected(!isAllSelected);
      if (isSelected) {
        tempSelectedAirLineList = airLineList;
      } else {
        tempSelectedAirLineList = [];
      }
    } else if (tempSelectedAirLineList.includes(selectedAirLineName)) {
      tempSelectedAirLineList = tempSelectedAirLineList.filter(
        (airLineName) => {
          return airLineName !== selectedAirLineName;
        }
      );
    } else {
      tempSelectedAirLineList.push(selectedAirLineName);
    }
    console.log("tempSelectedAirLineList", tempSelectedAirLineList);
    if (tempSelectedAirLineList.length === airLineList.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
    setSelectedAirLineList(tempSelectedAirLineList);
  };
  const handleSortByPriceOnClick = (selectedNum) => {
    setSelectedSortByPrice(
      selectedSortByPrice === selectedNum ? 0 : selectedNum
    );
  };

  const handlePriceRangeOnChange = (e) => {
    const { value } = e.target;
    setPriceRange({
      ...priceRange,
      pointedPrice: value,
    });
  };

  const handleStopOnClick = (clickedStop) => {
    let tempSelectedStop = [...selectedStop];
    if (tempSelectedStop.includes(clickedStop)) {
      tempSelectedStop = tempSelectedStop.filter((stop) => {
        return stop !== clickedStop;
      });
    } else {
      tempSelectedStop.push(clickedStop);
    }
    setSelectedStop(tempSelectedStop);
  };

  // ------- FILTER HANDLE -------
  useEffect(() => {
    let tempFlightList = [...location.state.data];
    tempFlightList = handleAllFilter(tempFlightList);
    setFilteredFlightList(tempFlightList);
  }, [
    priceRange,
    selectedSortByPrice,
    selectedAirLineList,
    selectedStop,
    departFilterList,
    arrivalFilterList,
  ]);

  const handleAllFilter = (tempFlightList) => {
    tempFlightList = handlePriceRangeFilter(tempFlightList);
    tempFlightList = handleSortByPriceFilter(tempFlightList);
    tempFlightList = handleAirLinesFilter(tempFlightList);
    tempFlightList = handleStoppingFilter(tempFlightList);
    tempFlightList = handleDepartTimeFilter(tempFlightList);
    tempFlightList = handleArrivalTimeFilter(tempFlightList);
    return tempFlightList;
  };

  const handlePriceRangeFilter = (tempFlightList) => {
    tempFlightList = tempFlightList.filter((flightData) => {
      const price = Number(flightData.price);
      const { minPrice, pointedPrice } = priceRange;
      return price >= minPrice && price <= pointedPrice;
    });
    return tempFlightList;
  };

  const handleSortByPriceFilter = (tempFlightList) => {
    if (selectedSortByPrice !== 0) {
      tempFlightList.sort((a, b) => {
        if (selectedSortByPrice === 1) return Number(a.price) - b.price;
        if (selectedSortByPrice === 2) return Number(b.price) - a.price;
      });
    }
    return tempFlightList;
  };

  const handleAirLinesFilter = (tempFlightList) => {
    if (selectedAirLineList.length !== 0) {
      tempFlightList = tempFlightList.filter((flightData) => {
        return selectedAirLineList.includes(flightData.flightName);
      });
    }
    return tempFlightList;
  };

  const handleStoppingFilter = (tempFlightList) => {
    if (selectedStop.length !== 0) {
      tempFlightList = tempFlightList.filter((flightData) => {
        if (flightData.stopping === "") {
          return selectedStop.includes("Non Stop");
        } else {
          return selectedStop.includes("1 Stop");
        }
      });
    }
    return tempFlightList;
  };
  const handleDepartTimeFilter = (tempFlightList) => {
    if (departFilterList.filter((pickUp) => pickUp.isSelected).length !== 0) {
      let departList = [...departFilterList];
      departList = departList.filter((pickUp) => pickUp.isSelected);
      tempFlightList = tempFlightList.filter((flightData) => {
        let [hour, minutes] = flightData.pickUpTime.split(":");
        hour = Number(hour);
        minutes = Number(minutes);
        if (minutes > 0 && [0, 6, 12, 18].includes(hour)) {
          hour++;
        }
        let flag = false;
        departList.map((pickUp) => {
          if (isInRange(pickUp.start, pickUp.end, hour)) {
            flag = true;
          }
        });
        return flag;
      });
    }
    return tempFlightList;
  };

  const handleArrivalTimeFilter = (tempFlightList) => {
    if (arrivalFilterList.filter((drop) => drop.isSelected).length !== 0) {
      let arrivalList = [...arrivalFilterList];
      arrivalList = arrivalList.filter((drop) => drop.isSelected);
      tempFlightList = tempFlightList.filter((flightData) => {
        let [hour, minutes] = flightData.dropTime.split(":");
        hour = Number(hour);
        minutes = Number(minutes);
        if (minutes > 0 && [0, 6, 12, 18].includes(hour)) {
          hour++;
        }
        let flag = false;
        arrivalList.map((drop) => {
          if (isInRange(drop.start, drop.end, hour)) {
            flag = true;
          }
        });
        return flag;
      });
    }
    return tempFlightList;
  };

  // console.log(location.state.data);
  return (
    <div className="AvailFlight">
      <div className="navbar-container">
        <dir className="navbar-content-wrapper">
          <h2>Flight Booking</h2>
          <p className="basic-details">
            {location.state.fromPlace +
              " to " +
              location.state.toPlace +
              " | " +
              location.state.date.split("-")[2] +
              " " +
              monthNoToMonthStr(location.state.date.split("-")[1])}
          </p>
        </dir>
      </div>
      <div className="avail-flight-container">
        <div className="filter-container">
          <div className="filter-content">
            <p className="filter-title">Price Range</p>
            <div className="price-range-filter-content">
              <input
                type="range"
                className="price-range-filter"
                min={priceRange.minPrice}
                max={priceRange.maxPrice}
                value={priceRange.pointedPrice}
                onChange={(e) => handlePriceRangeOnChange(e)}
              />
              <div className="min-max-price-container">
                <p>Rs.{priceRange.minPrice}</p>
                <p>Rs.{priceRange.pointedPrice}</p>
                {/* <p>Rs.{priceRange.maxPrice}</p> */}
              </div>
            </div>
          </div>
          {/* -------- */}
          <div className="filter-content">
            <p className="filter-title">Sort By Price</p>
            <div className="price-sort-content">
              <p
                className={`price-sort-option ${
                  selectedSortByPrice === 1 && "selected-price-sort-option"
                }`}
                onClick={() => handleSortByPriceOnClick(1)}
              >
                Low to High
              </p>
              <p
                className={`price-sort-option ${
                  selectedSortByPrice === 2 && "selected-price-sort-option"
                }`}
                onClick={() => handleSortByPriceOnClick(2)}
              >
                High to Low
              </p>
            </div>
          </div>
          {/* ------ */}
          <div className="filter-content">
            <p className="filter-title">Airlines</p>
            <div className="airline-filter-content">
              <label className="airline-option">
                <input
                  type="checkbox"
                  onClick={() => handleAirLineFilterOnClick("All")}
                  checked={isAllSelected}
                />
                All
              </label>
              {airLineList.map((airLineName, index) => {
                return (
                  <label className="airline-option" key={index}>
                    <input
                      type="checkbox"
                      onClick={() => handleAirLineFilterOnClick(airLineName)}
                      checked={selectedAirLineList.includes(airLineName)}
                    />
                    {airLineName}
                  </label>
                );
              })}
            </div>
          </div>
          {/* ------ */}
          <div className="filter-content">
            <p className="filter-title">
              Stops From {location.state.fromPlace}
            </p>
            <div className="filter-option-wrapper">
              <input
                type="checkbox"
                onClick={() => handleStopOnClick("Non Stop")}
                checked={selectedStop.includes("Non Stop")}
              />
              <label>Non Stop</label>
            </div>
            <div className="filter-option-wrapper">
              <input
                type="checkbox"
                onClick={() => handleStopOnClick("1 Stop")}
                checked={selectedStop.includes("1 Stop")}
              />
              <label>1 Stop</label>
            </div>
          </div>

          {/* ------------- */}
          <div className="filter-content">
            <p className="filter-title">
              Departure From {location.state.fromPlace}
            </p>
            <div className="time-filter-content">
              {departFilterList.map((filterData, index) => {
                return (
                  <div
                    className={`time-filter-option ${
                      filterData.isSelected && "selected-time-filter"
                    }`}
                    onClick={() => handleDepartFilterOnClick(index)}
                  >
                    <span class="material-symbols-outlined option-icon">
                      {filterData.iconText}
                    </span>
                    <p className="time-filter-option-text">
                      {filterData.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ------------ */}
          <div className="filter-content">
            <p className="filter-title">Arrival at {location.state.toPlace}</p>
            <div className="time-filter-content">
              {arrivalFilterList.map((filterData, index) => {
                return (
                  <div
                    className={`time-filter-option ${
                      filterData.isSelected && "selected-time-filter"
                    }`}
                    onClick={() => handleArrivalFilterOnClick(index)}
                  >
                    <span class="material-symbols-outlined option-icon">
                      {filterData.iconText}
                    </span>
                    <p className="time-filter-option-text">
                      {filterData.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ------- */}
        </div>
        <div className="fildered-flight-container">
          {filteredFlightList &&
            filteredFlightList?.map((flightData, index) => {
              return (
                <FlightDetails
                  key={index}
                  flightData={flightData}
                  fromPlace={location.state.fromPlace}
                  toPlace={location.state.toPlace}
                  date={location.state.date}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AvailFlight;

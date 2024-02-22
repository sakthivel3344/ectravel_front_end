import React, { useEffect, useState } from "react";
import "./AvailTrain.scss";
import TrainDetails from "../../../../components/TrainDetails";
import { useLocation } from "react-router-dom";
import {
  generateNextTenDate,
  isInRange,
  monthNoToMonthStr,
} from "../../../../utils/TicketBooking";
import { handleGetAvailTrainApiCall } from "../../../../utils/ApiCalls";

const AvailTrain = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dateList, setDateList] = useState(
    generateNextTenDate(location.state.date)
  );
  const [activeDate, setActiveDate] = useState(location.state.date);
  const [trainList, setTrainList] = useState(location.state.data);
  const [filteredTrainList, setFilteredTrainList] = useState(
    location.state.data
  );
  const [isAvailSelected, setIsAvailSelected] = useState(false);
  const [seatFilter, setSeatFilter] = useState([
    {
      seatName: "1A Seat",
      isSelected: false,
    },
    {
      seatName: "2A Seat",
      isSelected: false,
    },
    {
      seatName: "3A Seat",
      isSelected: false,
    },
    {
      seatName: "SL Seat",
      isSelected: false,
    },
    {
      seatName: "2S Seat",
      isSelected: false,
    },
    {
      seatName: "CC Seat",
      isSelected: false,
    },
  ]);
  const [pickUpFilterList, setPickUpFilterList] = useState([
    {
      label: "Night",
      time: "00:01 - 06:00",
      start: 0,
      end: 6,
      isSelected: false,
    },
    {
      label: "Morning",
      time: "06:01 - 12:00",
      start: 7,
      end: 12,
      isSelected: false,
    },
    {
      label: "Afternoon",
      time: "12:01 - 18:00",
      start: 13,
      end: 18,
      isSelected: false,
    },
    {
      label: "Evening",
      time: "18:01 - 00:00",
      start: 19,
      end: 23,
      isSelected: false,
    },
  ]);
  const [dropFilterList, setDropFilterList] = useState([
    {
      label: "Night",
      time: "00:01 - 06:00",
      start: 0,
      end: 6,
      isSelected: false,
    },
    {
      label: "Morning",
      time: "06:01 - 12:00",
      start: 7,
      end: 12,
      isSelected: false,
    },
    {
      label: "Afternoon",
      time: "12:01 - 18:00",
      start: 13,
      end: 18,
      isSelected: false,
    },
    {
      label: "Evening",
      time: "18:01 - 00:00",
      start: 19,
      end: 23,
      isSelected: false,
    },
  ]);
  const pageData = {
    fromPlace: location.state.fromPlace,
    toPlace: location.state.toPlace,
    date: location.state.date,
  };
  const handlePrevPage = () => {
    if (activeIndex != 0) setActiveIndex(activeIndex - 1);
  };
  const handleNextPage = () => {
    if (activeIndex != 1) setActiveIndex(activeIndex + 1);
  };
  const handleDateOnClick = (newDate) => {
    const dataObj = {
      pickUpDate: newDate,
      fromPlace: location.state.fromPlace,
      toPlace: location.state.toPlace,
    };
    const response = handleGetAvailTrainApiCall(dataObj);
    response.then((res) => {
      setTrainList(res.data);
      setActiveDate(newDate);
      setFilteredTrainList(res.data);
      handleAllFilter([...res.data]);
    });
  };

  useEffect(() => {
    handleAllFilter([...trainList]);
  }, [pickUpFilterList, dropFilterList]);

  // ON CLICK FUNCTION
  const handleQuickFilterOnCick = (e) => {
    setIsAvailSelected(e.target.checked);
  };
  const handleSeatFilterOnClick = (index, e) => {
    let arr = [...seatFilter];
    arr[index].isSelected = e.target.checked;
    setSeatFilter(arr);
  };
  const handlePickUpOnClick = (e, index) => {
    let arr = [...pickUpFilterList];
    arr[index].isSelected = e.target.checked;
    setPickUpFilterList(arr);
  };
  const handleDropOnClick = (e, index) => {
    let arr = [...dropFilterList];
    arr[index].isSelected = e.target.checked;
    setDropFilterList(arr);
  };

  // HANDLE FILTER FUNCTIONS
  const handleAllFilter = (arrList) => {
    let trainArrList = arrList;
    trainArrList = handlePickUpFilter(trainArrList);
    trainArrList = handleDropFilter(trainArrList);
    setFilteredTrainList(trainArrList);
  };

  const handlePickUpFilter = (trainArrList) => {
    if (pickUpFilterList.filter((pickUp) => pickUp.isSelected).length !== 0) {
      let pickUpList = [...pickUpFilterList];
      pickUpList = pickUpList.filter((pickUp) => pickUp.isSelected);
      trainArrList = trainArrList.filter((train) => {
        let [hour, minutes] = train.train.pickUpTime.split(":");
        hour = Number(hour);
        minutes = Number(minutes);
        if (minutes > 0 && [0, 6, 12, 18].includes(hour)) {
          hour++;
        }
        let flag = false;
        pickUpList.map((pickUp) => {
          if (isInRange(pickUp.start, pickUp.end, hour)) {
            flag = true;
          }
        });
        return flag;
      });
    }
    return trainArrList;
  };

  const handleDropFilter = (trainArrList) => {
    if (dropFilterList.filter((drop) => drop.isSelected).length !== 0) {
      let dropList = [...dropFilterList];
      dropList = dropList.filter((drop) => drop.isSelected);
      trainArrList = trainArrList.filter((train) => {
        let [hour, minutes] = train.train.dropTime.split(":");
        hour = Number(hour);
        minutes = Number(minutes);
        if (minutes > 0 && [0, 6, 12, 18].includes(hour)) {
          hour++;
        }
        let flag = false;
        dropList.map((drop) => {
          if (isInRange(drop.start, drop.end, hour)) {
            flag = true;
          }
        });
        return flag;
      });
    }
    return trainArrList;
  };

  useEffect(() => {
    if (location.state) {
      setTrainList(location.state.data);
      setFilteredTrainList(location.state.data);
    }
  }, []);
  return (
    <div className="AvailTrain">
      <nav className="avail-train-navbar">
        <div className="navbar-wrapper">
          <h2>Train Booking</h2>
          <p>{`${location.state?.fromPlace} to ${location.state?.toPlace} | ${
            activeDate.split("-")[2]
          } ${monthNoToMonthStr(activeDate.split("-")[1])}`}</p>
        </div>
      </nav>
      <div className="avail-train-content">
        <div className="filter-container">
          <div className="filter-content">
            <div className="title-container">
              <p className="title">Quick Filter</p>
              <p>CLEAR ALL</p>
            </div>
            <ul className="filter-list-wrapper">
              <li className="filter-item">
                <input type="checkbox" onClick={handleQuickFilterOnCick} />{" "}
                <p>Available</p>
              </li>
            </ul>
          </div>

          <div className="filter-content">
            <div className="title-container">
              <p className="title">Seat Filter</p>
              <p>CLEAR ALL</p>
            </div>
            <ul className="filter-list-wrapper">
              {seatFilter.map((seat, index) => {
                return (
                  <li className="filter-item" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) => handleSeatFilterOnClick(index, e)}
                    />
                    <p>{seat.seatName}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="filter-content">
            <div className="title-container">
              <p className="title">PickUp Timing</p>
              <p>CLEAR ALL</p>
            </div>
            <ul className="filter-list-wrapper">
              {pickUpFilterList.map((pickUp, index) => {
                return (
                  <li className="filter-item" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) => handlePickUpOnClick(e, index)}
                    />
                    <p>
                      {pickUp.label} <span>{pickUp.time}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="filter-content">
            <div className="title-container">
              <p className="title">Drop Timing</p>
              <p>CLEAR ALL</p>
            </div>
            <ul className="filter-list-wrapper">
              {dropFilterList.map((drop, index) => {
                return (
                  <li className="filter-item" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) => handleDropOnClick(e, index)}
                    />
                    <p>
                      {drop.label} <span>{drop.time}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="train-list-wrapper">
          <div className="date-slider-container">
            <span
              className="material-symbols-outlined arrow-btn"
              onClick={handlePrevPage}
            >
              chevron_left
            </span>
            <ul
              className="date-slider-content"
              style={{
                transform: `translateX(calc(-${activeIndex * 100}%))`,
              }}
            >
              {dateList.map((date, index) => {
                return (
                  <li
                    key={index}
                    className={`date-slider-item ${
                      activeDate === date.date ? `active` : ``
                    }`}
                    onClick={() => handleDateOnClick(date.date)}
                  >
                    {date.formatted}
                  </li>
                );
              })}
            </ul>
            <span
              className="material-symbols-outlined arrow-btn"
              onClick={handleNextPage}
            >
              chevron_right
            </span>
          </div>
          {filteredTrainList &&
            filteredTrainList.map((train, index) => {
              return (
                <TrainDetails
                  key={index}
                  train={train}
                  isAvailSelected={isAvailSelected}
                  seatFilter={seatFilter}
                  trainList={trainList}
                  pageData={pageData}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AvailTrain;

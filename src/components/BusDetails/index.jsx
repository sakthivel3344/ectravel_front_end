import React, { useEffect, useState } from "react";
import "./BusDetails.scss";
import {
  arrayFirstHalf,
  arraySecondHalf,
  calcDuration,
  handleSleeprtSeatSplit,
  monthNoToMonthStr,
} from "../../utils/TicketBooking";
import { useNavigate } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";
const BusDetails = ({
  key,
  busId,
  busName,
  rating,
  price,
  busType,
  pickUpDate,
  pickUpTime,
  dropDate,
  dropTime,
  seatList,
  seatType,
  pickUpList,
  dropList,
  fromPlace,
  toPlace,
  date,
}) => {
  const mainContext = useMain();
  const [visible, setVisible] = useState(false);
  const [selectSeat, setSelectSeat] = useState({
    selectedSeatIdList: [],
    selectedSeatDetailsList: [],
    selectedSeatNoList: [],
  });
  const [selectPickUpDrop, setSelectPickUpDrop] = useState({
    pickUp: pickUpList[0],
    drop: dropList[0],
  });
  const seatesLeft = seatList.filter((seat) => {
    return !seat.status;
  });
  const [selectedSeatNoList, setSelectedSeatNoList] = useState("");
  const navigate = useNavigate();
  const handleOnClick = () => {
    setVisible(!visible);
  };
  const handleSelectSeat = (seat, seatStatus) => {
    if (seatStatus) {
      return;
    }
    let tempSelectSeat = selectSeat;
    if (tempSelectSeat.selectedSeatIdList.includes(seat.seatId)) {
      let tempDetailsList = tempSelectSeat.selectedSeatDetailsList.filter(
        (seatObj) => seatObj.seatId !== seat.seatId
      );
      let tempIdList = [];
      tempDetailsList.map((seat) => {
        tempIdList.push(seat.seatId);
      });
      tempSelectSeat = {
        ...tempSelectSeat,
        selectedSeatIdList: tempIdList,
        selectedSeatDetailsList: tempDetailsList,
      };
      setSelectSeat(tempSelectSeat);
    } else {
      tempSelectSeat = {
        ...tempSelectSeat,
        selectedSeatIdList: [...tempSelectSeat.selectedSeatIdList, seat.seatId],
        selectedSeatDetailsList: [
          ...tempSelectSeat.selectedSeatDetailsList,
          seat,
        ],
      };
      setSelectSeat(tempSelectSeat);
    }
    let tempList = "";
    let once = true;
    tempSelectSeat.selectedSeatDetailsList.map((seat) => {
      if (once) {
        once = false;
      } else {
        tempList += ",";
      }
      tempList += "S" + seat.seatNo;
    });
    setSelectedSeatNoList(tempList);
  };
  const handleSelectPickUp = (pickUp) => {
    setSelectPickUpDrop({ ...selectPickUpDrop, pickUp: pickUp });
  };
  const handleSelectDrop = (drop) => {
    setSelectPickUpDrop({ ...selectPickUpDrop, drop: drop });
  };
  // ----------------------
  const firstHalfSeat = arrayFirstHalf(seatList);
  const secondHalfSeat = arraySecondHalf(seatList);
  // ----------------------
  const handleSubmit = () => {
    if (selectSeat.selectedSeatIdList.length > 0) {
      const data = {
        busId: busId,
        busName: busName,
        rating: rating,
        price: price,
        busType: busType,
        pickUpDate: pickUpDate,
        pickUpTime: selectPickUpDrop.pickUp.time,
        dropDate: dropDate,
        dropTime: selectPickUpDrop.drop.time,
        selectSeat: selectSeat,
        seatType: seatType,
        selectPickUpDrop: selectPickUpDrop,
        duration: calcDuration(
          pickUpDate,
          dropDate,
          selectPickUpDrop.pickUp.time,
          selectPickUpDrop.drop.time
        ),
        totalPrice: selectSeat.selectedSeatIdList.length * price,
        selectedSeatNoList: selectedSeatNoList,
        formattedPickUpDateTime: `${selectPickUpDrop.pickUp.time} - ${
          pickUpDate.split("-")[2]
        } ${monthNoToMonthStr(pickUpDate.split("-")[1])}`,
        formattedDropDateTime: `${selectPickUpDrop.drop.time} - ${
          dropDate.split("-")[2]
        } ${monthNoToMonthStr(dropDate.split("-")[1])}`,
        pickUpPlace: selectPickUpDrop.pickUp.place,
        dropPlace: selectPickUpDrop.drop.place,
        fromPlace,
        toPlace,
        date,
      };
      navigate("/services/busBooking", { state: data });
    }
  };
  const sleeperSeatSlpit = handleSleeprtSeatSplit(seatList);
  console.log("seatList -->", seatList);
  return (
    <div className={`BusDetails ${visible ? `active-bus` : ``}`} key={key}>
      <div
        className={`bus-details-top-container ${visible ? `bg-color` : ``}`}
        onClick={handleOnClick}
      >
        <div className="bus-details-top">
          <div className="top-flex-1">
            <div className="bus-name">
              <h3>{busName}</h3>
              <p>{busType}</p>
              <p>{seatType[0].toUpperCase() + seatType.slice(1)}</p>
            </div>
            <div className="center-wrapper">
              <p>{`${pickUpTime} - ${
                pickUpDate.split("-")[2]
              } ${monthNoToMonthStr(pickUpDate.split("-")[1])}`}</p>
              <hr />
              <p>{calcDuration(pickUpDate, dropDate, pickUpTime, dropTime)}</p>
              <hr />
              <p>{`${dropTime} - ${dropDate.split("-")[2]} ${monthNoToMonthStr(
                dropDate.split("-")[1]
              )}`}</p>
            </div>
            <p className="price">Rs.{price}</p>
          </div>
          <div className="top-flex-2">
            <div className="flex-left">
              <span>{rating}</span>
            </div>
            <div className="flex-right">
              <p>seats left {seatesLeft.length}</p>
            </div>
          </div>
        </div>
        <div className="bus-details-bottom">
          <button>SELECT SEATS</button>
        </div>
      </div>
      {/* {visible && ( */}
      <div
        className={`bus-details-bottom-container ${
          visible ? `visible-bus-details` : ` invisible-bus-details`
        }`}
      >
        <div className="bus-details-bottom-flex-1">
          <div className="bus-details-bottom-header">
            <h3>Select Seats</h3>
            <p></p>
          </div>
          <div className="bus-details-bottom-content-1">
            {seatType === "seater" ? (
              <div className="bus-layout-container">
                <div className="bus-layout-top-flex">
                  <span className="material-symbols-outlined">
                    swap_driving_apps_wheel
                  </span>
                </div>
                <div className="bus-layout-bottom-flex">
                  <div className="bus-layout-bottom-flex-1">
                    {firstHalfSeat.map((seat, index) => {
                      return (
                        <>
                          <span
                            className={`material-symbols-outlined seat ${
                              seat.status
                                ? "booked-bus-seat"
                                : selectSeat.selectedSeatIdList.includes(
                                    seat.seatId
                                  )
                                ? `selected-seat`
                                : ``
                            }`}
                            onClick={() => handleSelectSeat(seat, seat.status)}
                          >
                            weekend
                          </span>
                        </>
                      );
                    })}
                  </div>
                  <div className="bus-layout-bottom-flex-2">
                    <div className="bus-layout-bottom-flex-2">
                      {secondHalfSeat.map((seat, index) => {
                        return (
                          <>
                            <span
                              className={`material-symbols-outlined seat ${
                                seat.status
                                  ? "booked-bus-seat"
                                  : selectSeat.selectedSeatIdList.includes(
                                      seat.seatId
                                    )
                                  ? `selected-seat`
                                  : ``
                              }`}
                              onClick={() =>
                                handleSelectSeat(seat, seat.status)
                              }
                            >
                              weekend
                            </span>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="sleeper-bus-layout-1">
                  <div className="sleeper-bus-layout-1-header">
                    <span className="material-symbols-outlined">
                      swap_driving_apps_wheel
                    </span>
                  </div>
                  <div className="sleeper-bus-layout-1-content">
                    <div className="sleeper-bus-layout-1-content-1">
                      {sleeperSeatSlpit.upperBerthFirstFive.map((seat) => {
                        return (
                          <span
                            className={`sleeper-icon-layout ${
                              seat.status
                                ? "booked-bus-sleeper-seat "
                                : selectSeat.selectedSeatIdList.includes(
                                    seat?.seatId
                                  )
                                ? `selected-sleeper-seat`
                                : ``
                            }`}
                            onClick={() => handleSelectSeat(seat, seat.status)}
                          >
                            <span></span>
                          </span>
                        );
                      })}
                    </div>
                    <div className="sleeper-bus-layout-1-content-2">
                      {sleeperSeatSlpit.upperBerthLastTen.map((seat) => {
                        return (
                          <span
                            className={`sleeper-icon-layout ${
                              seat.status
                                ? "booked-bus-sleeper-seat "
                                : selectSeat.selectedSeatIdList.includes(
                                    seat?.seatId
                                  )
                                ? `selected-sleeper-seat`
                                : ``
                            }`}
                            onClick={() => handleSelectSeat(seat, seat.status)}
                          >
                            <span></span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="sleeper-bus-layout-2">
                  <div className="sleeper-bus-layout-2-header"></div>
                  <div className="sleeper-bus-layout-2-content">
                    <div className="sleeper-bus-layout-2-content-1">
                      {sleeperSeatSlpit.lowerBerthFirstFive.map((seat) => {
                        return (
                          <span
                            className={`sleeper-icon-layout ${
                              seat.status
                                ? "booked-bus-sleeper-seat "
                                : selectSeat.selectedSeatIdList.includes(
                                    seat?.seatId
                                  )
                                ? `selected-sleeper-seat`
                                : ``
                            }`}
                            onClick={() => handleSelectSeat(seat, seat.status)}
                          >
                            <span></span>
                          </span>
                        );
                      })}
                    </div>
                    <div className="sleeper-bus-layout-2-content-2">
                      {sleeperSeatSlpit.lowerBerthLastTen.map((seat) => {
                        return (
                          <span
                            className={`sleeper-icon-layout ${
                              seat.status
                                ? "booked-bus-sleeper-seat "
                                : selectSeat.selectedSeatIdList.includes(
                                    seat?.seatId
                                  )
                                ? `selected-sleeper-seat`
                                : ``
                            }`}
                            onClick={() => handleSelectSeat(seat, seat.status)}
                          >
                            <span></span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bus-details-bottom-flex-2">
          <div className="bus-details-bottom-header">
            <h3>Select Pickup & Drop Points</h3>
            <p></p>
          </div>
          <div className="bus-details-bottom-content-2">
            <div className="bus-details-bottom-content-2-top-flex">
              <div className="bus-details-bottom-content-2-top-flex-1">
                <div className="bus-details-bottom-content-2-top-flex-1-header">
                  <h4>PICK UP POINT</h4>
                </div>
                <div className="bus-details-bottom-content-2-top-flex-1-content">
                  {pickUpList.map((pickUp) => {
                    return (
                      <div
                        className="pick-up"
                        onClick={() => handleSelectPickUp(pickUp)}
                      >
                        <p>
                          {`${pickUp.place} -
                            ${pickUp.time} | ${
                            pickUpDate.split("-")[2]
                          } ${monthNoToMonthStr(pickUpDate.split("-")[1])}`}
                        </p>
                        {selectPickUpDrop.pickUp.place === pickUp.place && (
                          <span className="material-symbols-outlined">
                            check_circle
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bus-details-bottom-content-2-top-flex-2">
                <div className="bus-details-bottom-content-2-top-flex-2-header">
                  <h4>DROP POINT</h4>
                </div>
                <div className="bus-details-bottom-content-2-top-flex-2-content">
                  {dropList &&
                    dropList?.map((drop) => {
                      return (
                        <div
                          className="drop"
                          onClick={() => handleSelectDrop(drop)}
                        >
                          <p>
                            {`${drop?.place} -
                            ${drop?.time} | ${
                              dropDate?.split("-")[2]
                            } ${monthNoToMonthStr(dropDate?.split("-")[1])}`}
                          </p>
                          {selectPickUpDrop.drop.place === drop.place && (
                            <span className="material-symbols-outlined">
                              check_circle
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="bus-details-bottom-content-2-bottom-flex">
              <div className="bus-details-bottom-content-2-bottom-flex-top">
                <div className="bus-details-bottom-content-2-bottom-flex-left">
                  <h5>Selected Seats</h5>
                  <p>
                    {selectedSeatNoList !== ""
                      ? selectedSeatNoList
                      : "No seats selected yet"}
                  </p>
                </div>
                <div className="bus-details-bottom-content-2-bottom-flex-right">
                  {selectedSeatNoList !== ""
                    ? "Rs." + selectSeat.selectedSeatIdList.length * price
                    : ""}
                </div>
              </div>
              <button
                className={`continue-btn ${
                  selectedSeatNoList !== "" ? `active-btn` : ``
                }`}
                onClick={handleSubmit}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default BusDetails;

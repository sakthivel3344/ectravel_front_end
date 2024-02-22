import React, { useEffect, useState } from "react";
import "./TrainDetails.scss";
import { calcDuration, monthNoToMonthStr } from "../../utils/TicketBooking";
import TrainSeatDetails from "../TrainSeatDetails";
const TrainDetails = ({
  train,
  isAvailSelected,
  seatFilter,
  trainList,
  pageData,
}) => {
  const [seatList, setSeatList] = useState(train.trainSeatDetails);
  useEffect(() => {
    handleAllFilter();
  }, [isAvailSelected, seatFilter, trainList]);
  const handleAllFilter = () => {
    let arrList = [...train.trainSeatDetails];
    arrList = handleSeatFilter(arrList);
    arrList = handleQuickFilter(arrList);
    setSeatList(arrList);
  };

  const handleSeatFilter = (arrList) => {
    if (
      seatFilter.filter((seat) => seat.isSelected === false).length !==
      seatFilter.length
    ) {
      console.log("Entered");
      return arrList.filter((seat, index) => seatFilter[index].isSelected);
    }
    return arrList;
  };

  const handleQuickFilter = (arrList) => {
    if (isAvailSelected) {
      return arrList.filter((seat) => seat.availCount > 0);
    }
    return arrList;
  };
  return (
    <div className="TrainDetails">
      <div className="train-details-1">
        <p className="train-name">{train.train.trainName}</p>
        <div className="train-timing">
          <p>{`${train.train.pickUpTime} - ${
            train.train.pickUpDate.split("-")[2]
          } ${monthNoToMonthStr(train.train.pickUpDate.split("-")[1])}`}</p>
          <hr />
          <p>
            {calcDuration(
              train.train.pickUpDate,
              train.train.dropDate,
              train.train.pickUpTime,
              train.train.dropTime
            )}
          </p>
          <hr />
          <p>{`${train.train.dropTime} - ${
            train.train.dropDate.split("-")[2]
          } ${monthNoToMonthStr(train.train.dropDate.split("-")[1])}`}</p>
        </div>
      </div>

      <div className="train-details-2">
        {seatList.map((seat, index) => {
          return (
            <TrainSeatDetails
              key={index}
              seat={seat}
              pageData={{ ...pageData, train: train, seat: seat }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TrainDetails;

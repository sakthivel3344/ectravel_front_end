export const calcDuration = (pickUpDate, dropDate, pickUpTime, dropTime) => {
  let ddDue = 0;
  let hourDue = 0;
  let minuteDue = 0;

  let [year, month, date] = pickUpDate.split("-");
  let pickUpYear = Number(year);
  let pickUpMonth = Number(month);
  let pickUpDD = Number(date);

  [year, month, date] = dropDate.split("-");
  let dropYear = Number(year);
  let dropMonth = Number(month);
  let dropDD = Number(date);

  let [hour, minute] = pickUpTime.split(":");
  let pickUpHour = Number(hour);
  let pickUpMinute = Number(minute);

  [hour, minute] = dropTime.split(":");
  let dropHour = Number(hour);
  let dropMinute = Number(minute);

  const thirtyDayMonth = [4, 6, 9, 11];
  if (pickUpMonth != dropMonth) {
    let count = 0;
    if (pickUpMonth === 2) {
      let limitDD = isLeapYear(pickUpYear) ? 29 : 28;
      while (pickUpDD <= limitDD) {
        pickUpDD++;
        count++;
      }
    } else {
      let limitDD = thirtyDayMonth.includes(pickUpMonth) ? 30 : 31;
      while (pickUpDD <= limitDD) {
        pickUpDD++;
        count++;
      }
    }
    count += dropDD;
    ddDue = count;
    ddDue--;
  } else {
    ddDue = dropDD - pickUpDD;
  }
  // ddDue = 1;
  if (ddDue === 0) {
    let pickUpHr = pickUpHour;
    let pickUpMin = pickUpMinute;
    if (pickUpMin !== 0) {
      pickUpHr++;
      pickUpMin = 60 - pickUpMin;
    }
    hourDue = dropHour - pickUpHr;
    minuteDue = pickUpMin + dropMinute;
    if (minuteDue >= 60) {
      minuteDue -= 60;
      hourDue++;
    }
  } else if (ddDue === 1) {
    let dayOneHour = 0;
    let dayOneMinute = 0;
    let dayTwoHour = dropHour;
    let dayTwoMinute = dropMinute;

    let pickUpHr = pickUpHour;

    if (pickUpMinute !== 0) {
      pickUpHr++;
      dayOneMinute = 60 - pickUpMinute;
    }
    dayOneHour = 24 - pickUpHr;
    hourDue = dayOneHour + dayTwoHour;
    minuteDue = dayOneMinute + dayTwoMinute;
    if (minuteDue >= 60) {
      minuteDue -= 60;
      hourDue++;
    }
    ddDue--;
  } else {
    let dayOneHour = 0;
    let dayOneMinute = 0;
    let dayTwoHour = dropHour;
    let dayTwoMinute = dropMinute;

    let pickUpHr = pickUpHour;

    if (pickUpMinute !== 0) {
      pickUpHr++;
      dayOneMinute = 60 - pickUpMinute;
    }
    dayOneHour = 24 - pickUpHr;
    hourDue = dayOneHour + dayTwoHour;
    minuteDue = dayOneMinute + dayTwoMinute;
    if (minuteDue >= 60) {
      minuteDue -= 60;
      hourDue++;
    }
    ddDue--;
    if (hourDue >= 24) {
      ddDue += (hourDue - (hourDue % 24)) / 24;
      hourDue = hourDue % 24;
    }
  }
  if (hourDue >= 24) {
    ddDue += (hourDue - (hourDue % 24)) / 24;
    hourDue = hourDue % 24;
  }
  return `${ddDue !== 0 ? `${ddDue} day` : ``} 
  ${hourDue !== 0 ? `${hourDue} hr` : ""}
  ${minuteDue !== 0 ? `${minuteDue} min` : ``}`;
};

export const monthNoToMonthStr = (monthNo) => {
  monthNo = Number(monthNo);
  switch (monthNo) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
};

export const arrayFirstHalf = (arr) => {
  let resArr = [];
  for (let i = 0; i < arr.length / 2; i++) {
    resArr.push(arr[i]);
  }
  return resArr;
};

export const arraySecondHalf = (arr) => {
  let resArr = [];
  for (let i = arr.length / 2; i < arr.length; i++) {
    resArr.push(arr[i]);
  }
  return resArr;
};

export const handleSleeprtSeatSplit = (arr) => {
  let upperBerthFirstFive = [];
  let upperBerthLastTen = [];
  let lowerBerthFirstFive = [];
  let lowerBerthLastTen = [];
  for (let i = 0; i < 5; i++) {
    upperBerthFirstFive.push(arr[i]);
  }
  for (let i = 5; i < 15; i++) {
    upperBerthLastTen.push(arr[i]);
  }
  for (let i = 15; i < 20; i++) {
    lowerBerthFirstFive.push(arr[i]);
  }
  for (let i = 20; i < arr.length; i++) {
    lowerBerthLastTen.push(arr[i]);
  }
  return {
    upperBerthFirstFive: upperBerthFirstFive,
    upperBerthLastTen: upperBerthLastTen,
    lowerBerthFirstFive: lowerBerthFirstFive,
    lowerBerthLastTen: lowerBerthLastTen,
  };
};

export const generateNextTenDate = (date) => {
  const thirtyDayMonth = [4, 6, 9, 11];
  let [year, month, day] = date.split("-");
  year = Number(year);
  month = Number(month);
  day = Number(day);
  let currYear = year;
  let currMonth = month;
  let currDay = day;
  const result = [];
  if (month === 2) {
    let count = 0;

    let limitDay = isLeapYear(year) ? 29 : 28;
    while (currDay <= limitDay && count < 10) {
      result.push({
        date:
          currYear +
          "-" +
          currMonth +
          "-" +
          (currDay < 10 ? "0" : "") +
          currDay,
        formatted: currDay + " " + monthNoToMonthStr(currMonth),
      });
      count++;
      currDay++;
    }
    currDay = 1;
    currMonth++;
    while (count < 10) {
      result.push({
        date:
          currYear +
          "-" +
          currMonth +
          "-" +
          (currDay < 10 ? "0" : "") +
          currDay,
        formatted: currDay + " " + monthNoToMonthStr(currMonth),
      });
      count++;
      currDay++;
    }
  } else {
    let count = 0;
    let limitDay = thirtyDayMonth.includes(month) ? 30 : 31;
    while (currDay <= limitDay && count < 10) {
      result.push({
        date:
          currYear +
          "-" +
          currMonth +
          "-" +
          (currDay < 10 ? "0" : "") +
          currDay,
        formatted: currDay + " " + monthNoToMonthStr(currMonth),
      });
      count++;
      currDay++;
    }
    currDay = 1;
    currMonth++;
    while (count < 10) {
      result.push({
        date:
          currYear +
          "-" +
          currMonth +
          "-" +
          (currDay < 10 ? "0" : "") +
          currDay,
        formatted: currDay + " " + monthNoToMonthStr(currMonth),
      });
      count++;
      currDay++;
    }
  }
  return result;
};

const isLeapYear = (year) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

export const isInRange = (start, end, value) => {
  return value >= start && value <= end;
};

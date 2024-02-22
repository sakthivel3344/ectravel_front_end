import { DATE_AND_TIME, RADIO, TEXT } from "./inputType";

export const flightForm = [
  {
    id: 1,
    labelName: "Flight Name",
    type: TEXT,
    name: "flightName",
  },
  {
    id: 2,
    labelName: "From",
    type: TEXT,
    name: "fromPlace",
  },
  {
    id: 3,
    labelName: "To",
    type: TEXT,
    name: "toPlace",
  },
  {
    id: 4,
    labelName: "Pick Up date & time",
    type: DATE_AND_TIME,
    name: "pickUpDateAndTime",
  },
  {
    id: 5,
    labelName: "Drop date & time",
    type: DATE_AND_TIME,
    name: "dropDateAndTime",
  },
  {
    id: 6,
    labelName: "Is Meal",
    type: RADIO,
    radioList: ["Free", "Paid"],
    name: "isMealFree",
  },
  {
    id: 7,
    labelName: "Price",
    type: TEXT,
    name: "price",
  },
  {
    id: 8,
    labelName: "Business Class Avail Count",
    type: TEXT,
    name: "businessAvailCount",
  },
  {
    id: 9,
    labelName: "Economy Class Avail Count",
    type: TEXT,
    name: "economyAvailCount",
  },
  {
    id: 10,
    labelName: "Cabin Bag Limit",
    type: TEXT,
    name: "cabinBagLimit",
  },
  {
    id: 11,
    labelName: "Check In Limit",
    type: TEXT,
    name: "checkInLimit",
  },
];

const COMMON_API_LINK = "http://localhost:8088/api/v1/user/";
const COMMON_BUS_API_LINK = "http://localhost:8088/api/v1/bus/";
const COMMON_TRAIN_API_LINK = "http://localhost:8088/api/v1/train/";
const COMMON_FLIGHT_API_LINK = "http://localhost:8088/api/v1/flight/";
const COMMON_HOTEL_API_LINK = "http://localhost:8088/api/v1/hotel/";

const API_LINKS = {
  ADD_USER: COMMON_API_LINK + "adduser",
  USER_AUTHENTICATION: COMMON_API_LINK + "userauthentication",
  GET_USER_DETAILS: COMMON_API_LINK + "getuserdetails/",
  UPDATE_USER: COMMON_API_LINK + "updateUser",
  GET_MY_TRIPS: COMMON_API_LINK + "getMyTrips",

  BUS_API_LINKS: {
    ADD_BUS: COMMON_BUS_API_LINK + "addBus",
    GET_AVAIL_BUSES: COMMON_BUS_API_LINK + "getAvailBus",
    BUS_PAYMENT: COMMON_BUS_API_LINK + "busPayment",
  },

  TRAIN_API_LINKS: {
    GET_AVAIL_TRAINS: COMMON_TRAIN_API_LINK + "getAvailTrain",
    TRAIN_PAYMENT: COMMON_TRAIN_API_LINK + "trainPayment",
  },

  FLIGHT_API_LINKS: {
    GET_AVAIL_FLIGHTS: COMMON_FLIGHT_API_LINK + "getAvailFlight",
    FLIGHT_PAYMENT: COMMON_FLIGHT_API_LINK + "flightPayment",
  },

  ADMIN: {
    MANAGE_BUS: {
      GET_ALL_BUS: COMMON_BUS_API_LINK + "getAllBus",
      DELETE_BUS: COMMON_BUS_API_LINK + "deleteBus/",
      UPDATE_BUS: COMMON_BUS_API_LINK + "updateBus",
    },

    MANAGE_TRAIN: {
      GET_ALL_TRAIN: COMMON_TRAIN_API_LINK + "getAllTrain",
      ADD_TRAIN: COMMON_TRAIN_API_LINK + "addTrain",
      DELETE_TRAIN: COMMON_TRAIN_API_LINK + "deleteTrain/",
      UPDATE_TRAIN: COMMON_TRAIN_API_LINK + "updateTrain",
    },

    MANAGE_FLIGHT: {
      GET_ALL_FLIGHTS: COMMON_FLIGHT_API_LINK + "getAllFlights",
      ADD_FLIGHT: COMMON_FLIGHT_API_LINK + "addFlight",
      DELETE_FLIGHT: COMMON_FLIGHT_API_LINK + "deleteFlight/",
      UPDATE_FLIGHT: COMMON_FLIGHT_API_LINK + "updateFlight",
    },
    MANAGE_HOTEL: {
      GET_ALL_HOTEL: COMMON_HOTEL_API_LINK + "getAllHotel",
    }
  },
};

export default API_LINKS;

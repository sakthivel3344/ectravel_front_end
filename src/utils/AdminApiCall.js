import axios from "axios";
import API_LINKS from "../constants/ApiConstant";

export const handleGetAllBusApiCall = async () => {
  try {
    const response = await axios.get(API_LINKS.ADMIN.MANAGE_BUS.GET_ALL_BUS);
    return response;
  } catch (error) {
    console.log("GET ALL BUS API ERROR", error);
    return false;
  }
};

export const handleDeleteBusApiCall = async (busId) => {
  try {
    const response = await axios.delete(
      API_LINKS.ADMIN.MANAGE_BUS.DELETE_BUS + busId
    );
    return response;
  } catch (error) {
    console.log("DELETE BUS API ERROR", error);
    return false;
  }
};

export const handleUpdateBusApiCall = async (dataObj) => {
  try {
    console.log(dataObj);
    const response = await axios.put(
      API_LINKS.ADMIN.MANAGE_BUS.UPDATE_BUS,
      dataObj
    );
    return response;
  } catch (error) {
    console.log("UPDATE BUS API ERROR", error);
    return false;
  }
};

// -------- TRAIN API CALLS ---------

export const handleGetAllTrainApiCall = async () => {
  try {
    const response = await axios.get(
      API_LINKS.ADMIN.MANAGE_TRAIN.GET_ALL_TRAIN
    );
    return response;
  } catch (error) {
    console.log("GET ALL TRAIN API ERROR", error);
    return false;
  }
};

export const handleAddTrainApiCall = async (dataObj) => {
  try {
    const response = await axios.post(
      API_LINKS.ADMIN.MANAGE_TRAIN.ADD_TRAIN,
      dataObj
    );
    return response;
  } catch (error) {
    console.log("ADD TRAIN API ERROR", error);
    return false;
  }
};

export const handleDeleteTrainApiCall = async (trainId) => {
  try {
    const response = await axios.delete(
      API_LINKS.ADMIN.MANAGE_TRAIN.DELETE_TRAIN + trainId
    );
    return response;
  } catch (error) {
    console.log("DELETE TRAIN API ERROR", error);
    return false;
  }
};

export const handleUpdateTrainApiCall = async (dataObj) => {
  try {
    const response = await axios.put(
      API_LINKS.ADMIN.MANAGE_TRAIN.UPDATE_TRAIN,
      dataObj
    );
    return response;
  } catch (error) {
    console.log("UPDATE TRAIN API ERROR", error);
    return false;
  }
};

// ----------------- FLIGHT API CALLS ---------------------

export const handleGetAllFlightsApiCall = async () => {
  try {
    const response = await axios.get(
      API_LINKS.ADMIN.MANAGE_FLIGHT.GET_ALL_FLIGHTS
    );
    return response;
  } catch (error) {
    console.log("GET ALL FLIGHT API ERROR", error);
    return false;
  }
};

export const handleAddFlightApiCall = async (dataObj) => {
  try {
    const response = await axios.post(
      API_LINKS.ADMIN.MANAGE_FLIGHT.ADD_FLIGHT,
      dataObj
    );
    return response;
  } catch (error) {
    console.log("ADD FLIGHT API ERROR", error);
    return false;
  }
};

export const handleDeleteFlightApiCall = async (flightId) => {
  try {
    const response = await axios.delete(
      API_LINKS.ADMIN.MANAGE_FLIGHT.DELETE_FLIGHT + flightId
    );
    return response;
  } catch (error) {
    console.log("DELETE FLIGHT API ERROR", error);
    return false;
  }
};

export const handleUpdateFlightApiCall = async (dataObj) => {
  try {
    const response = await axios.put(
      API_LINKS.ADMIN.MANAGE_FLIGHT.UPDATE_FLIGHT,
      dataObj
    );
    return response;
  } catch (error) {
    console.log("UPDATE FLIGHT API ERROR", error);
    return false;
  }
};

export const handleGetAllHotelApiCall = async () => {
  try {
    const response = await axios.get(
      API_LINKS.ADMIN.MANAGE_HOTEL.GET_ALL_HOTEL,
    );
    return response;
  } catch (error) {
    console.log("GET ALL HOTEL API ERROR", error);
    return false;
  }
};
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../components/MainLayout";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Services from "../pages/Services";
import TrackLocation from "../pages/Services/TrackLocation";
import TicketBooking from "../pages/Services/TicketBooking";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Admin from "../pages/Admin";
import ManageUser from "../pages/Admin/ManageUser";
import AdminHome from "../pages/Admin/AdminHome";
import ManageFlightBooking from "../pages/Admin/ManageFlightBooking";
import ManageTrainBooking from "../pages/Admin/ManageTrainBooking";
import ManageBusBooking from "../pages/Admin/ManageBusBooking";
import AvailTrain from "../pages/Services/TicketBooking/AvailTrain";
import AvailBus from "../pages/Services/TicketBooking/AvailBus";
import TrainBooking from "../pages/Services/TicketBooking/TrainBooking";
import { Provider } from "react-redux";
import { trainBookingStore } from "../redux/app/trainBookingStore";
import AvailFlight from "../pages/Services/TicketBooking/AvailFlight";
import FlightBooking from "../pages/Services/TicketBooking/FlightBooking";
import BusBooking from "../pages/Services/TicketBooking/BusBooking";
import MyTrips from "../pages/MyTrips";
import BookedTripDetails from "../pages/BookedTripDetails";
import PopUp from "../pages/PopUp";
import HotelBooking from "../pages/Services/HotelBooking";
import ManageHotelBooking from "../pages/Admin/ManageHotelBooking";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="myTrips" element={<MyTrips />} />
        <Route path="bookedTripDetails" element={<BookedTripDetails />} />

        <Route path="services" element={<Services />}>
          <Route index path="tracklocation" element={<TrackLocation />} />
          <Route path="ticketbooking" element={<TicketBooking />} />
          <Route path="availBus" element={<AvailBus />} />
          <Route path="availTrain" element={<AvailTrain />} />
          <Route path="availFlight" element={<AvailFlight />} />
          <Route path="busBooking" element={<BusBooking />} />
          <Route path="trainBooking" element={<TrainBooking />} />
          <Route path="flightBooking" element={<FlightBooking />} />
          <Route path="hotelBooking" element={<HotelBooking />} />
        </Route>
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminHome />} />
        <Route path="manageUser" element={<ManageUser />} />
        <Route path="manageFlightBooking" element={<ManageFlightBooking />} />
        <Route path="manageTrainBooking" element={<ManageTrainBooking />} />
        <Route path="manageBusBooking" element={<ManageBusBooking />} />
        <Route path="manageHotelBooking" element={<ManageHotelBooking />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/popup" element={<PopUp />} />
    </Routes>
  );
};

export default MainRoutes;

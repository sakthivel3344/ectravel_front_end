import React, { useEffect, useReducer, useRef } from "react";
import "./Home.scss";
import travelPic from "../../assets/images/home/travel-pic.jpg";
import place1 from "../../assets/images/home/popular_places/pic-1.jpg";
import place2 from "../../assets/images/home/popular_places/pic-2.jpg";
import place3 from "../../assets/images/home/popular_places/pic-3.webp";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMain } from "../../contexts/MainContext";
import Alert from "../../components/Alert";
const Home = () => {
  const navigate = useNavigate();
  const parem = useParams();
  const mainContext = useMain();
  const location = useLocation();
  const serviceDivRef = useRef();
  const handleGetStatedOnClick = () => {
    serviceDivRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest", // 'start', 'center', 'end', or 'nearest'
      // inline: "nearest", // 'start', 'center', 'end', or 'nearest'
    });
  };
  return (
    <>
      <div className="Home">
        <div className="travel-pic-container">
          <img
            className="travel-pic"
            loading="lazy"
            src={travelPic}
            alt="Travel pic"
          />
          <div className="travel-description">
            <h1>Your Journey Your Story</h1>
            <p>Choose your Favourite Destination</p>
            <button onClick={handleGetStatedOnClick}>Get Started</button>
          </div>
        </div>
        {/* Services */}
        <div ref={serviceDivRef} className="services container">
          <h1 className="title">Services</h1>
          <div className="services-content">
            <div
              className="service"
              onClick={() => navigate("/services/tracklocation")}
            >
              <span className="material-symbols-outlined service-icon">
                location_on
              </span>
              <span className="service-name">Track Location</span>
            </div>
            <div
              className="service"
              onClick={() => navigate("/services/ticketBooking")}
            >
              <span className="material-symbols-outlined service-icon">
                airplane_ticket
              </span>
              <span className="service-name">Ticket Booking</span>
            </div>
            <div className="service">
              <span className="material-symbols-outlined service-icon">
                local_taxi
              </span>
              <span className="service-name">Taxi Booking</span>
            </div>
            <div className="service">
              <span className="material-symbols-outlined service-icon">
                hotel
              </span>
              <span className="service-name">Hotel Booking</span>
            </div>
            <div className="service">
              <span className="material-symbols-outlined service-icon">
                restaurant
              </span>
              <span className="service-name">Food Order</span>
            </div>
            <div className="service">
              <span className="material-symbols-outlined service-icon">
                tour
              </span>
              <span className="service-name">Tour Planner</span>
            </div>
          </div>
        </div>
        {/* Popular Places */}
        <div className="popular-places container">
          <h1 className="title">Popular Places</h1>

          <div className="popular-place">
            <div className="place-details">
              <span>Thanjavur Periya kovil</span>
              <p>
                Brihadeeshwara Temple (Peruvudaiyar Kovil) is a Hindu temple
                dedicated to Shiva located in Thanjavur in the Indian state of
                Tamil Nadu. It is also known as Periya Kovil, RajaRajeswara
                Temple and Rajarajesvaram. It is one of the largest temples in
                India and is an example of Dravidian architecture during the
                Chola period. Built by emperor Raja Raja Chola I and completed
                in 1010 AD, the temple turned 1000 years old in 2010. The temple
                is part of the UNESCO World Heritage Site known as the “Great
                Living Chola Temples”, with the other two being the
                Brihadeeswarar Temple, Gangaikonda Cholapuram and Airavatesvara
                temple.
              </p>
            </div>
            <img
              className="place-img"
              loading="lazy"
              src={place1}
              alt="place img"
            />
          </div>

          <div className="popular-place">
            <img
              className="place-img"
              loading="lazy"
              src={place2}
              alt="place img"
            />
            <div className="place-details">
              <span>Kodaikanal</span>
              <p>
                Located in the state of Tamil Nadu, Kodaikanal is one of the
                most famous honeymoon destinations in India. A Lakeside resort
                town of Tamil Nadu, Kodaikanal has a beautiful climate,
                mist-covered manicured cliffs and waterfall that come together
                to create the ideal setting for a perfect getaway. Kodaikanal
                means 'the gift of the forests'.
              </p>
            </div>
          </div>

          <div className="popular-place">
            <div className="place-details">
              <span>Ooty</span>
              <p>
                Imagine waking up to a dreamlike sunrise over the misty
                mountains, spending a whole day hiking through lush woods and
                fishing in the blue waters of a serene lake. The Avalanche Lake
                in Ooty has that and more to offer to travellers looking to be
                lost in the beauty of nature.
              </p>
            </div>
            <img
              className="place-img"
              loading="lazy"
              src={place3}
              alt="place img"
            />
          </div>
        </div>

        <footer>
          <div className="footer-container container">
            <div className="footer-wrapper">
              <div className="footer-content">
                <span>Quick Links</span>
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Profile</li>
                </ul>
              </div>
              <div className="footer-content">
                <span>Services</span>
                <ul>
                  <li>Track Location</li>
                  <li>Ticket Booking</li>
                  <li>Taxi Booking</li>
                  <li>Hotel Booking</li>
                  <li>Food Order</li>
                  <li>Tour Planner</li>
                </ul>
              </div>
              <div className="footer-content">
                <span>Contact info</span>
                <ul>
                  <li>+91 9344229677</li>
                  <li>asakthivel1122@gmail.com</li>
                  <li>Tamil Nadu</li>
                </ul>
              </div>
              <div className="footer-content">
                <span>Follow US</span>
                <ul>
                  <li>FaceBook</li>
                  <li>Instagram</li>
                  <li>Twitter</li>
                  <li>Linked in</li>
                </ul>
              </div>
            </div>
            <span>
              Created by <span>Salthivel</span> | All Rights Reserved!
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

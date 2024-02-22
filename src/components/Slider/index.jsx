import React, { useState } from "react";
import "./Slider.css";
import { offers } from "../../constants/OffersConstant";
const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevPage = () => {
    if (activeIndex != 0) setActiveIndex(activeIndex - 1);
  };
  const nextPage = () => {
    if (activeIndex != offers.length - 4) setActiveIndex(activeIndex + 1);
  };
  return (
    <div className="Slider">
      <div className="Slider-container">
        <ul
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% / 4))`,
          }}
        >
          {offers.map((offer) => {
            return (
              <li>
                <img src={offer.img} alt="img" />
                <p>Place: {offer.place}</p>
              </li>
            );
          })}
        </ul>
        <button onClick={prevPage} className="btn prev-btn">
          Prev
        </button>
        <button onClick={nextPage} className="btn next-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;

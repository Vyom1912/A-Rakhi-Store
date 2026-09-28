import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.webp";

const Offers = () => {
  const scrollToBestsellers = () =>
    document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className='offers'>
      <div className='offers-left'>
        <p className='offers-tag'>Special offer</p>
        <h1>
          Exclusive
          <br />
          Offers For You
        </h1>
        <p>ONLY ON BESTSELLER PRODUCTS</p>
        <button className='btn' onClick={scrollToBestsellers}>
          Check Now
        </button>
      </div>
      <div className='offers-right'>
        <img src={exclusive_image} alt='' loading='lazy' />
      </div>
    </section>
  );
};

export default Offers;

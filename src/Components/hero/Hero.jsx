import React from "react";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import hero_image from "../Assets/hero_image.png";
function Hero() {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <div>
          <div className='hero-hand-icon'>
            <p>Celebrate Raksha Bandhan with Handmade Rakhies</p>
          </div>
          <p>
            <span>Spiritual. Elegant. Traditional.</span>
          </p>
        </div>
        <div className='hero-latest-btn'>
          <div>Shop now</div>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
      <div className='hero-right'>
        <img src={hero_image} alt='' />
      </div>
    </div>
  );
}

export default Hero;

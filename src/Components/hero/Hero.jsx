import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import hero_image from "../Assets/hero_image.webp";
import { FULFILMENT_NOTE } from "../../storeConfig";

function Hero() {
  const scrollToProducts = () =>
    document.getElementById("shop-by-type")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className='hero'>
      <div className='hero-inner'>
        <div className='hero-right'>
          <img src={hero_image} alt='Sister tying a rakhi on her brother' />
        </div>
        <div className='hero-left'>
          <p className='hero-tag'>Handmade at home in Himatnagar</p>
          <h1>
            Handmade Rakhis, <span>woven with love</span>
          </h1>
          <p className='hero-sub'>
            Jeco Moti rakhis in Swastik, Ram and line designs, or with any name
            you like.
          </p>
          <div className='hero-buttons'>
            <button className='btn' onClick={scrollToProducts}>
              Shop rakhis
            </button>
            <Link to='/custom-rakhi' className='btn btn-outline'>
              Make a custom rakhi
            </Link>
          </div>
          <ul className='hero-points'>
            <li>Handmade with Jeco Moti</li>
            <li>{FULFILMENT_NOTE}</li>
            <li>Order on WhatsApp</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Hero;

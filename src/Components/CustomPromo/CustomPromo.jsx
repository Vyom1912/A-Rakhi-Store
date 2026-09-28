import React from "react";
import "./CustomPromo.css";
import { Link } from "react-router-dom";

const examples = ["BHAI", "VEER", "RAHUL", "ભાઈ", "राम"];

const CustomPromo = () => {
  return (
    <section className='section'>
      <div className='custom-promo'>
        <p className='custom-promo-tag'>Made to order</p>
        <h2>Any name, woven in beads</h2>
        <p>
          We weave the name you choose into the threads with Jeco Moti. Order
          several names at once, confirm the spelling and tell us your colours.
        </p>
        <div className='custom-promo-names' aria-hidden='true'>
          {examples.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <Link to='/custom-rakhi' className='btn'>
          Design a custom rakhi
        </Link>
      </div>
    </section>
  );
};

export default CustomPromo;

import React from "react";
import "./Loader.css";
import logo from "../Assets/logo_big.png";
import { STORE_NAME } from "../../storeConfig";

// short branded intro: logo and name fade in over a thin progress line
const Loader = () => {
  return (
    <div className='loader-div' role='status' aria-label='Loading'>
      <div className='loader-brand'>
        <img src={logo} alt='' />
        <p>{STORE_NAME}</p>
        <span className='loader-tagline'>Handmade Rakhis</span>
      </div>
      <div className='loader-bar' aria-hidden='true'>
        <span />
      </div>
    </div>
  );
};

export default Loader;

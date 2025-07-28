import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <img src={footer_logo} alt='' />
        <p>The Maroons</p>
      </div>
      <div className='footer-copyright'>
        <hr />
        <p>Phone no: 6353344875</p>
        <p>Copyright @ 2025 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;

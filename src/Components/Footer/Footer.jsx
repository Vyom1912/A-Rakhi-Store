import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import footer_logo from "../Assets/logo_big.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import {
  categories,
  PHONE_DISPLAY,
  PICKUP_ADDRESS,
  PICKUP_MAP_URL,
  STORE_NAME,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "../../storeConfig";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-brand'>
          <div className='footer-logo'>
            <img src={footer_logo} alt='' />
            <p>{STORE_NAME}</p>
          </div>
          <p>
            A small home business in Himatnagar. Every rakhi is handmade at home
            with premium Jeco Moti beads, and we weave custom names to order.
          </p>
        </div>

        <div className='footer-col'>
          <h3>Shop</h3>
          <ul>
            <li>
              <Link to='/'>All Rakhis</Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link to={`/${category.slug}`}>{category.title}</Link>
              </li>
            ))}
            <li>
              <Link to='/custom-rakhi'>Custom Name Rakhi</Link>
            </li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3>Contact</h3>
          <ul>
            <li>
              <a
                className='footer-whatsapp'
                href={whatsappLink(`Hello ${STORE_NAME}! I have a question about your rakhis.`)}
                target='_blank'
                rel='noreferrer'>
                <img src={whatsapp_icon} alt='' />
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <Link to='/contact'>Contact form</Link>
            </li>
            <li>
              <Link to='/how-to-order'>How to order</Link>
            </li>
            <li>
              <Link to='/terms'>Order terms &amp; policies</Link>
            </li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3>Pickup</h3>
          <address className='footer-address'>
            {PICKUP_ADDRESS}
            <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
              Open in Google Maps →
            </a>
          </address>
        </div>
      </div>
      <div className='footer-copyright'>
        <p>
          © {new Date().getFullYear()} {STORE_NAME} · Handmade in Himatnagar
        </p>
      </div>
    </footer>
  );
};

export default Footer;

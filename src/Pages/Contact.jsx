import React, { useState } from "react";
import "./CSS/Contact.css";
import { Link } from "react-router-dom";
import whatsapp_icon from "../Components/Assets/whatsapp_icon.png";
import {
  DELIVERY_CITY,
  DELIVERY_PINCODE,
  HOME_DELIVERY_ENABLED,
  openWhatsApp,
  PHONE_DISPLAY,
  PICKUP_ADDRESS,
  PICKUP_MAP_URL,
  STORE_NAME,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "../storeConfig";

const topics = ["Order enquiry", "Custom / bulk order", "Pickup", "Other"];

const Contact = () => {
  const [form, setForm] = useState({ name: "", topic: topics[0], message: "" });
  const [error, setError] = useState("");

  const update = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please enter your name and a message.");
      return;
    }
    openWhatsApp(
      [`*${form.topic} - ${STORE_NAME}*`, "", `Name: ${form.name.trim()}`, "", form.message.trim()].join(
        "\n"
      )
    );
  };

  return (
    <div className='contact'>
      <div className='section-heading'>
        <h1>Contact Us</h1>
        <p>We're a small home business. Messages come straight to us on WhatsApp.</p>
        <hr />
      </div>

      <div className='contact-layout'>
        <div className='contact-info'>
          <a
            className='contact-card contact-card-wa'
            href={whatsappLink(`Hello ${STORE_NAME}!`)}
            target='_blank'
            rel='noreferrer'>
            <img src={whatsapp_icon} alt='' />
            <span>
              <b>WhatsApp</b>
              {PHONE_DISPLAY}
            </span>
          </a>
          <a className='contact-card' href={`tel:+${WHATSAPP_NUMBER}`}>
            <span>
              <b>Call us</b>
              {PHONE_DISPLAY}
            </span>
          </a>
          <div className='contact-card contact-card-wide'>
            <span>
              <b>{HOME_DELIVERY_ENABLED ? "Pickup or free delivery" : "Pickup only"}</b>
              {PICKUP_ADDRESS}
              {HOME_DELIVERY_ENABLED &&
                ` · Free home delivery in ${DELIVERY_CITY} (${DELIVERY_PINCODE})`}
              <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
                Open in Google Maps →
              </a>
            </span>
          </div>
          <Link to='/custom-rakhi' className='contact-card contact-card-wide contact-card-custom'>
            <span>
              <b>Custom name rakhis</b>
              Design yours with any name, woven in Jeco Moti →
            </span>
          </Link>
        </div>

        <form className='contact-form' onSubmit={handleSubmit} noValidate>
          <label className='field'>
            Your name
            <input name='name' value={form.name} onChange={update} autoComplete='name' />
          </label>
          <label className='field'>
            Topic
            <select name='topic' value={form.topic} onChange={update}>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>
          <label className='field'>
            Message
            <textarea
              name='message'
              rows='5'
              value={form.message}
              onChange={update}
              placeholder='Tell us what you are looking for, e.g. 10 rakhis for the family.'
            />
          </label>
          {error && <p className='field-error'>{error}</p>}
          <button type='submit' className='btn btn-whatsapp'>
            Send on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

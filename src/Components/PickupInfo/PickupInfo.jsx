import React from "react";
import "./PickupInfo.css";
import { MAKING_TIME, PICKUP_ADDRESS, PICKUP_MAP_URL } from "../../storeConfig";

// pickup address and what happens after ordering; the pickup time is agreed on WhatsApp
const PickupInfo = () => (
  <div className='pickup-info'>
    <div className='pickup-card'>
      <b>Pickup only · collect your order from</b>
      <span>{PICKUP_ADDRESS}</span>
      <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
        Open in Google Maps →
      </a>
    </div>
    <p className='pickup-making-note'>
      Every rakhi is made by hand after we confirm your order, which takes{" "}
      <b>{MAKING_TIME}</b>. We message you on WhatsApp when it's ready and agree
      a pickup time with you.
    </p>
  </div>
);

export default PickupInfo;

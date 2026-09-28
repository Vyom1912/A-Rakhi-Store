import React from "react";
import "./TermsAgreement.css";
import { Link } from "react-router-dom";
import { MAKING_TIME, PICKUP_HOLD_DAYS } from "../../storeConfig";

// key order terms plus the "I agree" checkbox that must be ticked before sending an order
const TermsAgreement = ({ checked, onChange, error, custom = false }) => (
  <div className='terms-agree' data-error='terms'>
    <ul className='terms-agree-points'>
      <li>Your order is confirmed only when we reply on WhatsApp.</li>
      <li>Every rakhi is handmade and takes {MAKING_TIME}.</li>
      {custom ? (
        <li>
          Names are woven exactly as you spell them. Custom rakhis can't be
          cancelled or refunded once we start making them.
        </li>
      ) : (
        <li>You can cancel free of charge only before we start making your order.</li>
      )}
      <li>Please collect your order within {PICKUP_HOLD_DAYS} days of our "ready" message.</li>
    </ul>
    <label className='terms-agree-check'>
      <input type='checkbox' checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        I have read and agree to the{" "}
        <Link to='/terms' target='_blank'>
          Order Terms &amp; Policies
        </Link>
        .
      </span>
    </label>
    {error && <span className='field-error'>{error}</span>}
  </div>
);

export default TermsAgreement;

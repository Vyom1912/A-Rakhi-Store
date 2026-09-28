import React from "react";
import "./CSS/Terms.css";
import { Link } from "react-router-dom";
import {
  MAKING_TIME,
  ORDER_AHEAD_DAYS,
  PHONE_DISPLAY,
  PICKUP_ADDRESS,
  PICKUP_HOLD_DAYS,
  PICKUP_MAP_URL,
  STORE_NAME,
  THREAD_COLOUR,
} from "../storeConfig";

export const TERMS_UPDATED = "28 September 2026";

const sections = [
  {
    title: "1. Placing an order",
    points: [
      "Sending your order on WhatsApp is an order request. Your order is confirmed only when we reply on WhatsApp to confirm it.",
      "Prices on the website can change. The price we confirm on WhatsApp is the final price for your order.",
      `We are a small home business. During the festival rush we may not be able to take every order, and we will tell you on WhatsApp if we can't.`,
    ],
  },
  {
    title: "2. Making time",
    points: [
      `Every rakhi is made by hand after your order is confirmed. This takes ${MAKING_TIME}.`,
      "Just before Raksha Bandhan it can take longer. If so, we tell you before we start.",
      `Please order at least ${ORDER_AHEAD_DAYS} days before you need your rakhis.`,
    ],
  },
  {
    title: "3. Payment",
    points: [
      "We tell you the amount to pay when we confirm your order on WhatsApp.",
      "For custom name rakhis we may ask for an advance payment before we start making them. The rest is paid at pickup.",
    ],
  },
  {
    title: "4. Custom name rakhis",
    points: [
      "Names are made in English letters only.",
      "We weave each name exactly as it is spelled in your order. Please check the spelling carefully before sending. We are not responsible for spelling mistakes in the name you send us.",
      "If a name is too long for the design, we ask you before making any change.",
      `The thread is always ${THREAD_COLOUR.toLowerCase()}. Moti (bead) colours depend on availability, and we confirm them on WhatsApp.`,
      "Custom rakhis are made only for you, so they cannot be cancelled once we start making them, and cannot be returned or refunded.",
    ],
  },
  {
    title: "5. Ready-made designs",
    points: [
      "Each rakhi is handmade, so the beadwork and colours can differ slightly from the photos. Colours can also look different on different screens.",
      "You can cancel a ready-made order free of charge before we start making it.",
    ],
  },
  {
    title: "6. Pickup",
    points: [
      `All orders are picked up from ${PICKUP_ADDRESS}. We don't deliver at the moment.`,
      "When your rakhis are ready, we send you an acknowledgement message on WhatsApp and agree a pickup time with you.",
      `Please collect your order within ${PICKUP_HOLD_DAYS} days of our "ready" message. If it is not collected and we can't reach you, the order may be cancelled and any advance paid is not refunded.`,
    ],
  },
  {
    title: "7. Checking your order",
    points: [
      "Please check your rakhis when you pick them up.",
      "If something is wrong because of our mistake (for example, a name not woven as you sent it), tell us at pickup and we will fix or remake it.",
      "We can't accept returns or exchanges after pickup.",
    ],
  },
  {
    title: "8. Your details and privacy",
    points: [
      "We use your name and mobile number only to handle your order and contact you about it. We never share them.",
      "This website has no server and no account. Your cart and details are saved only in your own browser, and your order reaches us only when you send it on WhatsApp.",
    ],
  },
];

const Terms = () => {
  return (
    <div className='terms'>
      <div className='section-heading'>
        <h1>Order Terms &amp; Policies</h1>
        <p>Please read these before you place an order with {STORE_NAME}.</p>
        <hr />
      </div>

      <div className='terms-summary'>
        <h2>In short</h2>
        <ul>
          <li>Your order is confirmed only when we reply on WhatsApp.</li>
          <li>Rakhis are handmade and take {MAKING_TIME}.</li>
          <li>Custom name rakhis can't be cancelled once we start making them.</li>
          <li>Names are woven exactly as you spell them.</li>
          <li>Pickup only, within {PICKUP_HOLD_DAYS} days of our "ready" message.</li>
        </ul>
      </div>

      {sections.map((section) => (
        <section key={section.title} className='terms-section'>
          <h2>{section.title}</h2>
          <ul>
            {section.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ))}

      <section className='terms-section'>
        <h2>9. Questions</h2>
        <p>
          Message or call us on {PHONE_DISPLAY}, or use the{" "}
          <Link to='/contact'>contact page</Link>. Pickup address:{" "}
          <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
            {PICKUP_ADDRESS}
          </a>
          .
        </p>
      </section>

      <p className='terms-updated'>Last updated: {TERMS_UPDATED}</p>
    </div>
  );
};

export default Terms;

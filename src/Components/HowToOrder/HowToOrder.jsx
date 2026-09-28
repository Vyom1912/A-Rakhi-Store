import React from "react";
import "./HowToOrder.css";
import { Link } from "react-router-dom";
import {
  MAKING_TIME,
  ORDER_AHEAD_DAYS,
  PICKUP_ADDRESS,
  PICKUP_HOLD_DAYS,
  PICKUP_MAP_URL,
  STORE_NAME,
} from "../../storeConfig";

// the ordering flow as a timeline, with example WhatsApp messages between the
// customer (green, right) and the shop (white, left)
const steps = [
  {
    title: "Choose your rakhis",
    who: "You",
    text: (
      <>
        Add ready designs to your cart, and <Link to='/custom-rakhi'>custom name rakhis</Link> too.
        Everything goes into one cart.
      </>
    ),
  },
  {
    title: "Send your order on WhatsApp",
    who: "You",
    text: "In the cart, enter your name and mobile number. WhatsApp opens with your whole order already written, so you only tap Send.",
    bubble: {
      from: "customer",
      lines: [
        `*New Order - ${STORE_NAME}*`,
        "1. Swastik Rakhi · ID #42 × 2",
        "Custom rakhi: RAHUL × 1, White Moti",
        "Total: Rs. 80 + custom",
      ],
      time: "10:15 AM",
    },
  },
  {
    title: "We confirm your order",
    who: STORE_NAME,
    text: "We reply to confirm the price (including custom rakhis) and payment. Your order is confirmed only after this reply.",
    bubble: {
      from: "shop",
      lines: ["Thank you! 🙏 Your order is confirmed.", "Here is your total with the custom rakhi price. We start making them today."],
      time: "10:32 AM",
    },
  },
  {
    title: `We make it by hand · ${MAKING_TIME}`,
    who: STORE_NAME,
    text: "Every rakhi is woven by hand at home with Jeco Moti beads, so it takes a little time. Custom names are woven exactly as you spelled them.",
    making: true,
  },
  {
    title: "Ready! We send you a message",
    who: STORE_NAME,
    text: "When your order is complete, we send an acknowledgement on WhatsApp and agree a pickup time with you.",
    bubble: {
      from: "shop",
      lines: ["Your rakhis are ready ✅", "When would you like to pick them up?"],
      time: `After ${MAKING_TIME}`,
    },
  },
  {
    title: "Pick up & celebrate",
    who: "You",
    text: (
      <>
        Collect your rakhis from {PICKUP_ADDRESS} at the time we agreed, within{" "}
        {PICKUP_HOLD_DAYS} days of our message.{" "}
        <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
          Open in Google Maps →
        </a>
      </>
    ),
  },
];

const HowToOrder = () => {
  return (
    <section className='section how' id='how-to-order'>
      <div className='section-heading'>
        <h2>How to Order</h2>
        <p>From WhatsApp message to pickup, step by step</p>
        <hr />
      </div>

      <ol className='how-timeline'>
        {steps.map((step, i) => (
          <li key={step.title} className='how-step'>
            <span className='how-step-number'>{i + 1}</span>
            <div className='how-step-body'>
              <p className='how-step-who'>{step.who}</p>
              <h3>{step.title}</h3>
              <p className='how-step-text'>{step.text}</p>

              {step.bubble && (
                <div className={`how-chat how-chat-${step.bubble.from}`}>
                  <div className='how-bubble'>
                    {step.bubble.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                    <small>
                      {step.bubble.time}
                      {step.bubble.from === "customer" && " ✓✓"}
                    </small>
                  </div>
                </div>
              )}

              {step.making && (
                <div className='how-making' aria-hidden='true'>
                  <span className='how-making-bar' />
                  <span>{MAKING_TIME}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className='how-notes'>
        <p>
          🪔 <b>Festival tip:</b> please order at least {ORDER_AHEAD_DAYS} days before
          Raksha Bandhan.
        </p>
        <p>
          By ordering you agree to our <Link to='/terms'>Order Terms &amp; Policies</Link>.
        </p>
      </div>
    </section>
  );
};

export default HowToOrder;

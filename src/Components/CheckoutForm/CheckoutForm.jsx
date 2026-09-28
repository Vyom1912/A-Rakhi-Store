import React, { useContext, useEffect, useState } from "react";
import "./CheckoutForm.css";
import { ShopContext } from "../../Context/ShopContext";
import {
  DELIVERY_CITY,
  DELIVERY_PINCODE,
  HOME_DELIVERY_ENABLED,
  openWhatsApp,
  PICKUP_ADDRESS,
} from "../../storeConfig";
import { isValidPhone, loadCustomer, normalisePhone, saveCustomer } from "../../customer";
import { buildOrderMessage } from "../../orderMessage";
import PickupInfo from "../PickupInfo/PickupInfo";
import TermsAgreement from "../TermsAgreement/TermsAgreement";

const CheckoutForm = ({ itemsInCart }) => {
  const { all_product, cartItems, customItems } = useContext(ShopContext);
  const [customer, setCustomer] = useState(loadCustomer);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  // home delivery can be switched off in storeConfig; then every order is a pickup
  const isDelivery = HOME_DELIVERY_ENABLED && customer.method === "delivery";

  useEffect(() => saveCustomer(customer), [customer]);

  const update = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const found = {};
    if (!customer.name.trim()) found.name = "Please enter your name.";
    if (!isValidPhone(customer.phone)) found.phone = "Please enter a valid 10-digit mobile number.";
    if (isDelivery) {
      if (!customer.address.trim()) found.address = "Please enter your delivery address.";
      if (customer.pincode.trim() !== DELIVERY_PINCODE) {
        found.pincode = `Home delivery is only available in ${DELIVERY_CITY} (${DELIVERY_PINCODE}). Please choose pickup instead.`;
      }
    }
    if (!agreed) found.terms = "Please read and agree to the order terms.";
    return found;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document
        .querySelector(`.checkout [data-error="${firstError}"]`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    openWhatsApp(
      buildOrderMessage({
        readyItems: itemsInCart.map((product) => ({ product, qty: cartItems[product.id] })),
        customItems,
        allProducts: all_product,
        customer,
        phone: normalisePhone(customer.phone),
        isDelivery,
      })
    );
  };

  return (
    <form className='checkout' onSubmit={handleSubmit} noValidate>
      <h2>Your details</h2>

      <label className='field' data-error='name'>
        Full name
        <input name='name' value={customer.name} onChange={update} autoComplete='name' />
        {errors.name && <span className='field-error'>{errors.name}</span>}
      </label>

      <label className='field' data-error='phone'>
        Mobile number
        <input
          name='phone'
          type='tel'
          inputMode='numeric'
          value={customer.phone}
          onChange={update}
          autoComplete='tel'
          placeholder='10-digit mobile number'
        />
        {errors.phone && <span className='field-error'>{errors.phone}</span>}
      </label>

      {HOME_DELIVERY_ENABLED && (
        <fieldset className='checkout-methods'>
          <legend>How would you like to get your order?</legend>
          <label className={`checkout-method ${!isDelivery ? "selected" : ""}`}>
            <input type='radio' name='method' value='pickup' checked={!isDelivery} onChange={update} />
            <span>
              <b>Pickup</b>
              <small>{PICKUP_ADDRESS}</small>
            </span>
          </label>
          <label className={`checkout-method ${isDelivery ? "selected" : ""}`}>
            <input type='radio' name='method' value='delivery' checked={isDelivery} onChange={update} />
            <span>
              <b>Home delivery · Free</b>
              <small>
                Only in {DELIVERY_CITY} ({DELIVERY_PINCODE})
              </small>
            </span>
          </label>
        </fieldset>
      )}

      {isDelivery ? (
        <>
          <label className='field' data-error='address'>
            Delivery address
            <textarea
              name='address'
              rows='3'
              value={customer.address}
              onChange={update}
              autoComplete='street-address'
              placeholder='House no., society / street, landmark'
            />
            {errors.address && <span className='field-error'>{errors.address}</span>}
          </label>
          <label className='field' data-error='pincode'>
            Pincode
            <input
              name='pincode'
              inputMode='numeric'
              maxLength={6}
              value={customer.pincode}
              onChange={update}
              autoComplete='postal-code'
              placeholder={DELIVERY_PINCODE}
            />
            {errors.pincode && <span className='field-error'>{errors.pincode}</span>}
          </label>
          <label className='field'>
            <span>
              Note <span className='field-optional'>(optional)</span>
            </span>
            <input name='note' value={customer.note} onChange={update} />
          </label>
        </>
      ) : (
        <PickupInfo />
      )}

      <TermsAgreement
        custom={customItems.length > 0}
        checked={agreed}
        onChange={(value) => {
          setAgreed(value);
          setErrors((prev) => ({ ...prev, terms: undefined }));
        }}
        error={errors.terms}
      />

      <button type='submit' className='btn btn-whatsapp'>
        Place order on WhatsApp
      </button>
      <p className='checkout-note'>
        This opens WhatsApp with your whole order ready to send. We reply to
        confirm it, and message you again when your rakhis are ready.
      </p>
    </form>
  );
};

export default CheckoutForm;

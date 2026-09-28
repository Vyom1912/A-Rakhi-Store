import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import {
  FULFILMENT_NOTE,
  MAKING_TIME,
  getCategory,
  HOME_DELIVERY_ENABLED,
  PICKUP_ADDRESS,
  PICKUP_MAP_URL,
} from "../../storeConfig";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const navigate = useNavigate();
  const category = getCategory(product.category);
  const discount = Math.round(
    ((product.old_price - product.new_price) / product.old_price) * 100
  );

  // every order goes through the cart, so the customer's details are always collected
  const buyNow = () => {
    addToCart(product.id, quantity);
    navigate("/cart");
  };

  const quantityStepper = (
    <div className='qty-stepper'>
      <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label='Decrease quantity'>
        −
      </button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity((q) => q + 1)} aria-label='Increase quantity'>
        +
      </button>
    </div>
  );

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <button
          type='button'
          className={`productdisplay-photo ${zoomed ? "zoomed" : ""}`}
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? "Zoom out" : "Zoom in to see the beadwork"}>
          <img src={product.image} alt={product.name} />
          <span className='productdisplay-zoom-hint'>{zoomed ? "Tap to zoom out" : "Tap to zoom"}</span>
        </button>
      </div>

      <div className='productdisplay-right'>
        <div className='productdisplay-meta'>
          {category && (
            <Link to={`/${category.slug}`} className='productdisplay-category'>
              {category.title}
            </Link>
          )}
          <p className='productdisplay-id'>ID #{product.id}</p>
        </div>
        <h1>{product.name}</h1>
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-new'>Rs. {product.new_price}</div>
          <div className='productdisplay-right-old'>Rs. {product.old_price}</div>
          {discount > 0 && <div className='productdisplay-discount'>{discount}% OFF</div>}
        </div>

        <div className='productdisplay-quantity'>
          <span>Quantity</span>
          {quantityStepper}
        </div>

        <div className='productdisplay-actions'>
          <button className='btn btn-outline' onClick={() => addToCart(product.id, quantity)}>
            Add to cart
          </button>
          <button className='btn' onClick={buyNow}>
            Buy now
          </button>
        </div>

        <Link to={`/custom-rakhi?design=${product.id}`} className='productdisplay-custom'>
          <b>Want this design with a name?</b>
          <span>Customise it with any name in Jeco Moti →</span>
        </Link>

        <ul className='productdisplay-details'>
          <li>Handmade at home with premium Jeco Moti beads</li>
          <li>Made to order in {MAKING_TIME} after we confirm on WhatsApp</li>
          <li>{FULFILMENT_NOTE}. We message you when it is ready</li>
          <li>Each rakhi is made by hand, so small variations make it unique</li>
        </ul>

        {!HOME_DELIVERY_ENABLED && (
          <div className='pickup-card'>
            <b>Pickup address</b>
            <span>{PICKUP_ADDRESS}</span>
            <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
              Open in Google Maps →
            </a>
          </div>
        )}
      </div>

      {/* phones: price and buttons stay reachable at the bottom of the screen */}
      <div className='productdisplay-buybar'>
        <div className='productdisplay-buybar-price'>
          <b>Rs. {product.new_price * quantity}</b>
          <span>{quantity > 1 ? `${quantity} rakhis` : "per rakhi"}</span>
        </div>
        <button className='btn btn-outline' onClick={() => addToCart(product.id, quantity)}>
          Add
        </button>
        <button className='btn' onClick={buyNow}>
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;

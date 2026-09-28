import React, { useContext } from "react";
import "./CartItems.css";
import { Link } from "react-router-dom";
import remove_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CustomCartItem from "./CustomCartItem";
import { HOME_DELIVERY_ENABLED } from "../../storeConfig";

const CartItems = () => {
  const {
    getTotalCartAmount,
    getReadyMadeCount,
    getCustomCount,
    all_product,
    cartItems,
    customItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
  } = useContext(ShopContext);

  const itemsInCart = all_product.filter((product) => cartItems[product.id] > 0);
  const total = getTotalCartAmount();
  const customCount = getCustomCount();

  if (itemsInCart.length === 0 && customItems.length === 0) {
    return (
      <div className='cartitems cartitems-empty'>
        <img src={remove_icon} alt='' />
        <h1>Your cart is empty</h1>
        <p>Browse our handmade rakhis, or design one with a name.</p>
        <div className='cartitems-empty-actions'>
          <Link to='/' className='btn'>
            Start shopping
          </Link>
          <Link to='/custom-rakhi' className='btn btn-outline'>
            Make a custom rakhi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='cartitems'>
      <div className='cartitems-header'>
        <h1>Your Cart</h1>
        <button className='cartitems-clear' onClick={clearCart}>
          Clear cart
        </button>
      </div>

      <div className='cartitems-layout'>
        <div className='cartitems-list'>
          {itemsInCart.length > 0 && (
            <>
              <div className='cartitems-format-main'>
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p></p>
              </div>
              {itemsInCart.map((item) => (
                <div className='cartitems-format' key={item.id}>
                  <Link to={`/product/${item.id}`} className='cartitems-product'>
                    <img src={item.image} className='carticon-product-icon' alt='' />
                    <p className='cartitem-fname'>{item.name}</p>
                  </Link>
                  <p className='cartitem-fprice'>Rs. {item.new_price}</p>
                  <div className='qty-stepper cartitems-quantity'>
                    <button onClick={() => removeFromCart(item.id)} aria-label='Decrease quantity'>
                      −
                    </button>
                    <span>{cartItems[item.id]}</span>
                    <button onClick={() => addToCart(item.id)} aria-label='Increase quantity'>
                      +
                    </button>
                  </div>
                  <p className='cartitem-ftotal'>Rs. {item.new_price * cartItems[item.id]}</p>
                  <button
                    className='cartitems-remove'
                    onClick={() => deleteFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}>
                    <img src={remove_icon} alt='' />
                  </button>
                </div>
              ))}
            </>
          )}

          {customItems.length > 0 && (
            <div className='cartitems-custom'>
              <h2>Custom name rakhis</h2>
              {customItems.map((item, index) => (
                <CustomCartItem key={item.key} item={item} index={index} />
              ))}
            </div>
          )}

          <Link to='/custom-rakhi' className='cartitems-add-custom'>
            + Add a custom name rakhi
          </Link>
        </div>

        <div className='cartitems-total'>
          <h2>Order Summary</h2>
          {itemsInCart.length > 0 && (
            <div className='cartitems-total-item'>
              <p>Ready-made ({getReadyMadeCount()})</p>
              <p>Rs. {total}</p>
            </div>
          )}
          {customCount > 0 && (
            <div className='cartitems-total-item'>
              <p>Custom name ({customCount})</p>
              <p className='cartitems-muted'>On WhatsApp</p>
            </div>
          )}
          <div className='cartitems-total-item'>
            <p>{HOME_DELIVERY_ENABLED ? "Delivery / Pickup" : "Pickup"}</p>
            <p className='cartitems-free'>Free</p>
          </div>
          <div className='cartitems-total-item cartitems-grand'>
            <h3>Total</h3>
            <h3>
              Rs. {total}
              {customCount > 0 && <small> + custom</small>}
            </h3>
          </div>
          {customCount > 0 && (
            <p className='cartitems-custom-note'>
              Custom rakhi prices depend on the names, so we confirm them on
              WhatsApp before we start.
            </p>
          )}
          <CheckoutForm itemsInCart={itemsInCart} />
          <Link to='/' className='btn btn-outline'>
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

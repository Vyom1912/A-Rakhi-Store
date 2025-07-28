import React, { useContext } from "react";
import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className='cartitems'>
      <h1 className='cartitems-title'>
        Your Cart
        <br />
        <hr />
      </h1>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <span>
        <hr />
      </span>

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} className='carticon-product-icon' alt='' />
                <p className='cartitem-fname'>
                  {e.name}
                  <br />
                  <span>
                    <hr />
                  </span>
                </p>
                <p className='cartitem-fprice'>
                  <span>Price: </span>Rs. {e.new_price}
                </p>
                <button className='cartitems-qyantity'>
                  <span>Qnt: </span>
                  {cartItems[e.id]}
                </button>
                <p className='cartitem-ftotal'>
                  <span>Total: </span>Rs. {e.new_price * cartItems[e.id]}
                </p>
                <img
                  src={remove_icon}
                  alt=''
                  className='cartitems-remove-icon'
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>Cart Totals</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>Rs. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>free</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>Rs. {getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              if (getTotalCartAmount() > 0) {
                alert(
                  "We're sorry! Delivery for this product is currently unavailable in your area. For more details or help, feel free to contact us at the number provided. Thank you for your understanding."
                );
              } else {
                alert(
                  "Please select an item before proceeding. Let us know if you need any help choosing!"
                );
              }
            }}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className='cartitems-promrcode'>
          <p>If you have a promo code, Enter it here</p>
          <div className='cartitems-promobox'>
            <input type='text' name='' placeholder='promo code' id='' />
            <button> Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

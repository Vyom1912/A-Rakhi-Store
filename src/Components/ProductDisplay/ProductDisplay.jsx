import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [showMessage, setShowMessage] = useState(false);

  function addToCartWithQuantity(productId) {
    setShowMessage(true);
  }
  const handleClick = () => {
    addToCart(product.id);
    addToCartWithQuantity(product.id);
  };

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={product.image} alt='' />
        </div>
      </div>
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        <div className='productdisplay-right-stars'>
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_dull_icon} alt='' />
          <p>(120)</p>
        </div>
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-old'>
            Rs. {product.old_price}
          </div>
          <div className='productdisplay-right-new'>
            Rs. {product.new_price}
          </div>
        </div>
        <button onClick={handleClick}>ADD TO CART</button>
        <p
          className='productdisplay-cart-message'
          style={{ display: showMessage ? "block" : "none" }}>
          poduct is added in cart
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;

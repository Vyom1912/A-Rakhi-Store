import React, { useContext } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const discount = Math.round(
    ((props.old_price - props.new_price) / props.old_price) * 100
  );

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} className='item-image'>
        <img src={props.image} alt={props.name} loading='lazy' />
        {discount > 0 && <span className='item-badge'>{discount}% OFF</span>}
      </Link>
      <div className='item-body'>
        <Link to={`/product/${props.id}`} className='item-name'>
          {props.name}
        </Link>
        <div className='item-prices'>
          <div className='item-price-new'>Rs. {props.new_price}</div>
          <div className='item-price-old'>Rs. {props.old_price}</div>
        </div>
        <button className='item-add' onClick={() => addToCart(props.id)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Item;

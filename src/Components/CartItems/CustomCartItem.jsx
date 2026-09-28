import React, { useContext } from "react";
import { Link } from "react-router-dom";
import remove_icon from "../Assets/cart_cross_icon.png";
import { customRakhiCount, ShopContext } from "../../Context/ShopContext";
import BeadPreview from "../BeadPreview/BeadPreview";
import { MOTI_COLOURS, THREAD_COLOUR } from "../../storeConfig";

// one custom name rakhi request in the cart: its names, colours and instructions
const CustomCartItem = ({ item, index }) => {
  const { all_product, removeCustomItem } = useContext(ShopContext);
  const base = all_product.find((p) => p.id === item.baseProductId);
  const colour = MOTI_COLOURS.find((c) => c.name === item.motiColour);
  const count = customRakhiCount(item);

  return (
    <div className='custom-cart-item'>
      <div className='custom-cart-head'>
        <div>
          <b>Custom Name Rakhi {index + 1}</b>
          <span>
            {count} rakhi{count > 1 ? "s" : ""} · price confirmed on WhatsApp
          </span>
        </div>
        <button
          className='cartitems-remove'
          onClick={() => removeCustomItem(item.key)}
          aria-label='Remove custom rakhi'>
          <img src={remove_icon} alt='' />
        </button>
      </div>

      <ul className='custom-cart-names'>
        {item.names.map((name, i) => (
          <li key={i}>
            <BeadPreview text={name.text} colour={item.motiColour} small />
            <span className='custom-cart-qty'>× {name.qty}</span>
            {name.spelling && <small>Spelling: {name.spelling}</small>}
          </li>
        ))}
      </ul>

      <dl className='custom-cart-details'>
        <div>
          <dt>Thread</dt>
          <dd>{THREAD_COLOUR}</dd>
        </div>
        <div>
          <dt>Moti</dt>
          <dd>
            {colour && <span className='custom-cart-dot' style={{ background: colour.hex }} />}
            {item.motiColour}
          </dd>
        </div>
        {base && (
          <div>
            <dt>Design</dt>
            <dd>Like #{base.id}</dd>
          </div>
        )}
        {item.instructions && (
          <div className='custom-cart-wide'>
            <dt>Instructions</dt>
            <dd>{item.instructions}</dd>
          </div>
        )}
      </dl>

      <Link to={`/custom-rakhi?edit=${item.key}`} className='custom-cart-edit'>
        Edit names or colours
      </Link>
    </div>
  );
};

export default CustomCartItem;

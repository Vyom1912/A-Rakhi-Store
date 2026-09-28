import React, { useContext } from "react";
import "./ShopByType.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { categories } from "../../storeConfig";

const ShopByType = () => {
  const { all_product } = useContext(ShopContext);

  return (
    <section className='section' id='shop-by-type'>
      <div className='section-heading'>
        <h2>Shop by Type</h2>
        <p>Pick a style to see every design</p>
        <hr />
      </div>
      <div className='type-grid'>
        {categories.map((category) => (
          <Link key={category.slug} to={`/${category.slug}`} className='type-card'>
            <img src={category.sample} alt='' loading='lazy' />
            <div className='type-card-text'>
              <h3>{category.label}</h3>
              <span>
                {all_product.filter((p) => p.category === category.slug).length} designs →
              </span>
            </div>
          </Link>
        ))}
        <Link to='/custom-rakhi' className='type-card type-card-custom'>
          <div className='type-card-name'>Your Name</div>
          <div className='type-card-text'>
            <h3>Custom</h3>
            <span>Any name in beads →</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ShopByType;

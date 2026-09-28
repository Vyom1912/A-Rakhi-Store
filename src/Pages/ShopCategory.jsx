import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import TypeSlider from "../Components/TypeSlider/TypeSlider";

const sorters = {
  featured: () => 0,
  "price-low": (a, b) => a.new_price - b.new_price,
  "price-high": (a, b) => b.new_price - a.new_price,
};

const ShopCategory = ({ category }) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState("featured");

  const products = all_product
    .filter((item) => item.category === category.slug)
    .sort(sorters[sortBy]);

  return (
    <>
      <TypeSlider active={category.slug} />
      <div className='shop-category'>
        <img className='shopcategory-banner' src={category.banner} alt='' />

        <div className='shopcategory-indexSort'>
          <div>
            <h1>{category.title}</h1>
            <p>
              <span>{products.length}</span> handmade designs
            </p>
          </div>
          <label className='shopcategory-sort'>
            <span>Sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value='featured'>Featured</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
            </select>
          </label>
        </div>

        <div className='product-grid'>
          {products.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopCategory;

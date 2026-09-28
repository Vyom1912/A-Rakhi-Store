import React from "react";
import data_product from "../Assets/data";
import Item from "../Item/Item";

const Popular = () => {
  return (
    <section className='section' id='popular'>
      <div className='section-heading'>
        <h1>Festive Bestsellers</h1>
        <p>Our most loved handmade rakhis this season</p>
        <hr />
      </div>
      <div className='product-grid'>
        {data_product.map((item) => (
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
    </section>
  );
};

export default Popular;

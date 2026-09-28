import React from "react";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";

const NewCollections = () => {
  return (
    <section className='section' id='new-collections'>
      <div className='section-heading'>
        <h1>New Collections</h1>
        <p>Fresh designs, handcrafted with premium Jeco Moti</p>
        <hr />
      </div>
      <div className='product-grid'>
        {new_collection.map((item) => (
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

export default NewCollections;

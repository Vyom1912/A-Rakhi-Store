import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";
import { getCategory } from "../../storeConfig";

// recommendations always come from the same rakhi type as the product being viewed.
// They start from the next design after this one, so each product page suggests
// different rakhis instead of always the same first few.
const RelatedProducts = ({ product }) => {
  const { all_product } = useContext(ShopContext);
  const category = getCategory(product.category);
  const sameType = all_product.filter((item) => item.category === product.category);
  const start = sameType.findIndex((item) => item.id === product.id) + 1;
  const related = [...sameType.slice(start), ...sameType.slice(0, start - 1)].slice(0, 8);

  if (related.length === 0) return null;

  return (
    <section className='section'>
      <div className='section-heading-row'>
        <h2>More {category ? category.title : "rakhis"}</h2>
        {category && <Link to={`/${category.slug}`}>View all →</Link>}
      </div>
      <div className='product-scroller'>
        {related.map((item) => (
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

export default RelatedProducts;

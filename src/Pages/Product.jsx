import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useParams } from "react-router-dom";
import TypeSlider from "../Components/TypeSlider/TypeSlider";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  // an unknown id in the URL used to crash the whole page
  if (!product) {
    return (
      <div className='product-not-found'>
        <h1>Product not found</h1>
        <p>This rakhi may have been removed or the link is incorrect.</p>
        <Link to='/' className='btn'>
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className='product-page'>
      <TypeSlider active={product.category} />
      <Breadcrum product={product} />
      <ProductDisplay key={product.id} product={product} />
      <RelatedProducts product={product} />
    </div>
  );
};

export default Product;

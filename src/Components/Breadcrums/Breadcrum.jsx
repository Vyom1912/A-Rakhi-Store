import React from "react";
import "./Breadcrum.css";
import { Link } from "react-router-dom";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { getCategory } from "../../storeConfig";

const Breadcrum = ({ product }) => {
  const category = getCategory(product.category);
  return (
    <nav className='breadcrum' aria-label='Breadcrumb'>
      <Link to='/'>Home</Link>
      <img src={arrow_icon} alt='' />
      {category ? (
        <Link to={`/${category.slug}`}>{category.label}</Link>
      ) : (
        <span>Shop</span>
      )}
      <img src={arrow_icon} alt='' />
      <span className='breadcrum-current'>{product.name}</span>
    </nav>
  );
};

export default Breadcrum;

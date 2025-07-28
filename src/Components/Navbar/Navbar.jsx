import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
export default function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  // const dropdown_toggle = (e) => {
  //   menuRef.current.classList.toggle("nav-menu-visible");
  //   e.target.classList.toggle("open");
  // };

  return (
    <div>
      <div className='nav-main-box'>
        <div className='navbar'>
          <div className='nav-logo'>
            <img src={logo} alt='' />
            <p>The Maroons</p>
          </div>

          <ul ref={menuRef} className='nav-menu'>
            <li
              onClick={() => {
                setMenu("shop");
              }}>
              <Link style={{ textDecoration: "none" }} to='/'>
                Shop
              </Link>
              {menu === "shop" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("swastik-design");
              }}>
              <Link style={{ textDecoration: "none" }} to='/swastik-design'>
                swastik-design
              </Link>
              {menu === "swastik-design" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("ram");
              }}>
              <Link style={{ textDecoration: "none" }} to='/ram'>
                Ram
              </Link>
              {menu === "ram" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("design-big");
              }}>
              <Link style={{ textDecoration: "none" }} to='/design-big'>
                5 Line
              </Link>
              {menu === "design-big" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("design-small");
              }}>
              <Link style={{ textDecoration: "none" }} to='/design-small'>
                3 Line
              </Link>
              {menu === "design-small" ? <hr /> : <></>}
            </li>
          </ul>
          <div className='nav-login-cart'>
            <Link style={{ textDecoration: "none" }} to='/cart'>
              <img src={cart_icon} alt='' />
            </Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import {
  categories,
  FULFILMENT_NOTE,
  PICKUP_ADDRESS,
  PICKUP_MAP_URL,
  HOME_DELIVERY_ENABLED,
  STORE_NAME,
  whatsappLink,
} from "../../storeConfig";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const { pathname } = useLocation();
  const cartCount = getTotalCartItems();
  const closeMenu = () => setMenuOpen(false);
  const headerRef = useRef(null);

  // close the menu whenever the page changes
  useEffect(() => setMenuOpen(false), [pathname]);

  // while the menu is open: lock page scrolling and close it with the Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setMenuOpen(false);
    document.body.classList.add("no-scroll");
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // share the header height as --header-height, so sticky bars (like the type slider)
  // sit right below it. It changes when the announcement line wraps on small screens.
  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return;
    const update = () =>
      document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // add a shadow under the header once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header ref={headerRef} className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <p className='nav-announcement'>
          <span>{FULFILMENT_NOTE}</span>
          <span>Custom name rakhis</span>
          <span className='nav-announcement-extra'>Order on WhatsApp</span>
        </p>
        <nav className='navbar' aria-label='Main'>
          <button
            type='button'
            className='nav-toggle'
            onClick={() => setMenuOpen(true)}
            aria-label='Open menu'
            aria-expanded={menuOpen}
            aria-controls='nav-drawer'>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to='/' className='nav-logo'>
            <img src={logo} alt='' />
            <span>{STORE_NAME}</span>
          </Link>

          <ul className='nav-links'>
            <li>
              <NavLink to='/' end>
                Shop
              </NavLink>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <NavLink to={`/${category.slug}`}>{category.label}</NavLink>
              </li>
            ))}
            <li>
              <NavLink to='/contact'>Contact</NavLink>
            </li>
          </ul>

          <div className='nav-actions'>
            <NavLink to='/custom-rakhi' className='nav-custom-btn'>
              Custom Rakhi
            </NavLink>
            <Link to='/cart' className='nav-cart' aria-label={`Cart, ${cartCount} items`}>
              <img src={cart_icon} alt='' />
              {cartCount > 0 && <span className='nav-cart-count'>{cartCount}</span>}
            </Link>
          </div>
        </nav>
      </header>

      {/* mobile menu: tapping the dimmed backdrop outside the drawer closes it */}
      <div
        className={`nav-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
        aria-hidden='true'
      />
      <aside
        id='nav-drawer'
        className={`nav-drawer ${menuOpen ? "open" : ""}`}
        aria-label='Menu'
        inert={!menuOpen}>
        <div className='nav-drawer-head'>
          <Link to='/' className='nav-logo'>
            <img src={logo} alt='' />
            <span>{STORE_NAME}</span>
          </Link>
          <button type='button' className='nav-close' onClick={closeMenu} aria-label='Close menu'>
            ×
          </button>
        </div>

        <nav className='nav-drawer-body'>
          <NavLink to='/' end className='nav-drawer-link'>
            Home
          </NavLink>

          <p className='nav-drawer-label'>Shop by type</p>
          <div className='nav-drawer-categories'>
            {categories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/${category.slug}`}
                className='nav-drawer-category'>
                <img src={category.sample} alt='' />
                <span>{category.label}</span>
              </NavLink>
            ))}
          </div>

          <NavLink to='/custom-rakhi' className='nav-drawer-custom'>
            <b>Custom name rakhi</b>
            <span>Any name, woven in Jeco Moti beads →</span>
          </NavLink>

          <NavLink to='/cart' className='nav-drawer-link'>
            Cart {cartCount > 0 && <span className='nav-drawer-count'>{cartCount}</span>}
          </NavLink>
          <NavLink to='/how-to-order' className='nav-drawer-link'>
            How to order
          </NavLink>
          <NavLink to='/contact' className='nav-drawer-link'>
            Contact us
          </NavLink>
          <NavLink to='/terms' className='nav-drawer-link'>
            Order terms
          </NavLink>
        </nav>

        <div className='nav-drawer-foot'>
          {!HOME_DELIVERY_ENABLED && (
            <div className='pickup-card'>
              <b>Pickup address</b>
              <span>{PICKUP_ADDRESS}</span>
              <a href={PICKUP_MAP_URL} target='_blank' rel='noreferrer'>
                Open in Google Maps →
              </a>
            </div>
          )}
          <a
            className='btn btn-whatsapp'
            href={whatsappLink(`Hello ${STORE_NAME}!`)}
            target='_blank'
            rel='noreferrer'>
            <img className='nav-wa-icon' src={whatsapp_icon} alt='' />
            Chat on WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}

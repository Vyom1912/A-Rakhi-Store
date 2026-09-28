import React, { useEffect, useRef } from "react";
import "./TypeSlider.css";
import { Link } from "react-router-dom";
import { categories } from "../../storeConfig";

// sticky row of rakhi types at the top of category and product pages.
// It scrolls sideways, and the current type is scrolled into view.
const TypeSlider = ({ active }) => {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    const current = row?.querySelector(".type-slide.active");
    if (row && current) {
      row.scrollLeft = current.offsetLeft - (row.clientWidth - current.clientWidth) / 2;
    }
  }, [active]);

  return (
    <nav className='type-slider' aria-label='Rakhi types'>
      <div className='type-slider-row' ref={rowRef}>
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/${category.slug}`}
            className={`type-slide ${active === category.slug ? "active" : ""}`}
            aria-current={active === category.slug ? "page" : undefined}>
            {category.label}
          </Link>
        ))}
        <Link to='/custom-rakhi' className='type-slide type-slide-custom'>
          Custom Name
        </Link>
      </div>
    </nav>
  );
};

export default TypeSlider;

import React from "react";
import Hero from "../Components/hero/Hero";
import ShopByType from "../Components/ShopByType/ShopByType";
import Popular from "../Components/Popular/Popular";
import CustomPromo from "../Components/CustomPromo/CustomPromo";
import NewCollections from "../Components/NewCollections/NewCollections";
import Offers from "../Components/Offers/Offers";
import HowToOrder from "../Components/HowToOrder/HowToOrder";

function Shop() {
  return (
    <div>
      <Hero />
      <ShopByType />
      <Popular />
      <CustomPromo />
      <NewCollections />
      <Offers />
      <HowToOrder />
    </div>
  );
}

export default Shop;

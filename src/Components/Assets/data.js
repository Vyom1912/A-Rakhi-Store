import all_product from "./all_product";

// Festive Bestsellers, picked by product id from the main catalogue
// so the image, name and product page always match
const bestseller_ids = [1, 42, 5, 26];

const data_product = bestseller_ids.map((id) =>
  all_product.find((product) => product.id === id)
);

export default data_product;

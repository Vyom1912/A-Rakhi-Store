import all_product from "./all_product";

// New Collections, picked by product id from the main catalogue
const new_collection_ids = [12, 35, 14, 8, 15, 2, 17, 28];

const new_collections = new_collection_ids.map((id) =>
  all_product.find((product) => product.id === id)
);

export default new_collections;

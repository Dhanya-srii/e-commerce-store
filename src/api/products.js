import axios from "axios";

export const products = {
  async fetchAllProducts() {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data.products;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async fetchSingleProduct(id) {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const data = response.data;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

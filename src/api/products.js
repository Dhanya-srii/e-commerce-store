import axios from 'axios';
import { parseDailyProducts } from './parser';

export const products = {
  async fetchAllProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data.products;
      return data.map(parseDailyProducts);
    } catch (err) {
      throw new Error(err);
    }
  },

  async fetchSingleProduct(id) {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const data = response.data;
      return parseDailyProducts(data);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async fetchSearchProduct(userSearch) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${userSearch}`
      );
      const data = response.data.products;
      return data.map(parseDailyProducts);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

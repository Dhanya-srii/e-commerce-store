import axios from 'axios';
import { parseProducts } from './parser';

export const products = {
  async fetchAllProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data.products;
      return data.map(parseProducts);
    } catch (err) {
      throw new Error(err);
    }
  },

  /**
   * retrieves the product data of given product id
   * @param {string} productId
   * @returns returns the product data of the given product id.
   */
  async fetchProductData(productId) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      const data = response.data;
      return parseProducts(data);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async fetchSearchProduct(query) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      const data = response.data.products;
      return data.map(parseProducts);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

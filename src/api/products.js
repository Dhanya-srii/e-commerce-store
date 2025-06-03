import axios from 'axios';
import { parseProduct } from './parser';

export const products = {
  async fetchAllProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data.products;
      return data.map(parseProduct.parseDailyProducts);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async fetchSingleProduct(id) {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      const data = response.data;
      console.log(data);
      
      return parseProduct.parseDailyProducts(data);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

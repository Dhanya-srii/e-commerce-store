import axios from 'axios';
import { parseDailyProducts } from './parser';

export const products = {
  async fetchAllProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data.products;
      // console.log(data);
      for (let i of data) {
        console.log('category-', i.category,":","brand-",i.brand);
        // console.log('brand-', i.brand);  
      }
console.log("xxxxxxxxx");

      return data.map(parseDailyProducts);
    } catch (err) {
      throw new Error(err.message);
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
};

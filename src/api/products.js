import axios from 'axios';
import { parseProducts } from './parser';

export const products = {
  
  async fetchAllProducts(limit, skip) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = response.data.products;
      return data.map(parseProducts);
    } catch (err) {
      alert(err.message);
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
  async fetchProductCategoriesList() {
    try {
      const response = await axios.get(
        'https://dummyjson.com/products/category-list'
      );
      const data = response.data;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async fetchProductCategories(categoryList) {
    try {
      const responses = await Promise.all(
        categoryList.map((category) =>
          axios.get(`https://dummyjson.com/products/category/${category}`)
        )
      );

      const allProducts = responses.flatMap((res) =>
        res.data.products.map(parseProducts)
      );

      return allProducts;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async fetchProductsByPrice(sort) {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?sortBy=title&order=${sort}`
      );
      const data = response.data.products;
      return data.map(parseProducts);
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

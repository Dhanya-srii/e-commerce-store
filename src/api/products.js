import axios from 'axios';
import { parseProducts } from './parser';

export const products = {
  /**
   * retrieves product data by limit
   * @param {Number} limitSkip
   * @returns returns product data by limit
   */

  async fetchAllProducts(limit, skip, searchQuery) {
    let BASE_URL = 'https://dummyjson.com/products';

    BASE_URL =
      BASE_URL +
      `${
        searchQuery ? `/search?q=${searchQuery}&` : '?'
      }limit=${limit}&skip=${skip}`;

    try {
      const response = await axios.get(BASE_URL);
      const data = response.data.products;
      return {
        data: data.map(parseProducts),
        total: response.data.total,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * retrieves the searched product data
   * @param {string} query
   * @returns returns the searched product data .
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

  /**
   * retrieves the  categories  of  product
   * @returns returns the  categories  of  product .
   */

  async fetchCategoryNames() {
    try {
      const response = await axios.get(
        'https://dummyjson.com/products/categories'
      );

      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * Retrieves the selected category of product data.
   * @param {string[]} categoryList - List of selected categories.
   * @returns {{ products: Array, totalProducts: number }}
   */
  async fetchProductsCategories(categoryList) {
    const allProducts = [];
    let totalProducts = 0;

    try {
      for (const category of categoryList) {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        const products = response.data.products;
        totalProducts += products.length;
        allProducts.push(...products.map(parseProducts));
      }
      return { products: allProducts, totalProducts };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  /**
   * retrieves the product data by price
   * @param {string} sort
   * @returns returns the product data by price .
   */

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

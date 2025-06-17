import Vue from 'vue';

import { products } from '/src/api/products.js';
export const storeProducts = {
  state: {
    favourites: JSON.parse(localStorage.getItem('favourites')) || {},
    searchedProduct: null,
    productList: [],
  },
  mutations: {
    setFavList(state, val) {
      if (state.favourites[val.id]) {
        Vue.delete(state.favourites, val.id);
      } else {
        const favProduct = {
          [val.id]: val,
        };
        state.favourites = {
          ...state.favourites,
          ...favProduct,
        };
      }

      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    getSearchedProduct(state, product) {
      state.searchedProduct = product;
    },
  },
  actions: {
    async fetchData({ state }) {
      const data = await products.fetchAllProducts();
      state.productList = data;
      return state.productList;
    },
  },
  getters: {
    getSearchedProduct: (state) => state.searchedProduct,
  },
};

import Vue from 'vue';
import { products } from '/src/api/products.js';

export const storeProducts = {
  state: {
    favourites: JSON.parse(localStorage.getItem('favourites')) || {},
    productData: [],
    searchProduct: [],
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

    setProductList(state, data) {
      state.productData = data;
    },
    setSearchProduct(state, search) {
      state.searchProduct = search;
    },
  },

  actions: {
    async fetchData({ commit }) {
      const data = await products.fetchAllProducts();
      commit('setProductList', data);
      return data;
    },
    getSearch(state) {
      return state.searchProduct;
    },
  },
};

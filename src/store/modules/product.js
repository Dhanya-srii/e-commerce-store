import Vue from 'vue';
import { products } from '/src/api/products.js';

export const storeProducts = {
  state: {
    favourites: JSON.parse(localStorage.getItem('favourites')) || {},
    productData: [],
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

    setProductData(state, data) {
      state.productData = data;
    },
  },

  actions: {
    async fetchData({ commit }) {
      const data = await products.fetchAllProducts();
      commit('setProductData', data);
      return data;
    },

  },
};

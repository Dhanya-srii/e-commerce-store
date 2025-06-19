import Vue from 'vue';
import { products } from '/src/api/products.js';

export const storeProducts = {
  state: {
    favourites: JSON.parse(localStorage.getItem('favourites')) || {},
    allProducts: [],
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

    setAllProducts(state, productList) {
      state.allProducts = productList;
    },
  },

  actions: {
    async loadAllProducts({ commit }) {
      const productList = await products.fetchAllProducts();
      commit('setAllProducts', productList);
      return productList;
    },
  },
};

import Vue from 'vue';
import { products } from '/src/api/products.js';

export const storeProducts = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
  },

  mutations: {
    updateFavList(state, val) {
      if (state.favouritesList[val.id]) {
        Vue.delete(state.favouritesList, val.id);
      } else {
        const favProduct = {
          [val.id]: val,
        };
        state.favouritesList = {
          ...state.favouritesList,
          ...favProduct,
        };
      }
      localStorage.setItem(
        'favouritesList',
        JSON.stringify(state.favouritesList)
      );
    },

    setproductData(state, productList) {
      state.productData = productList;
    },
  },

  actions: {
    async getAllProducts({ commit }) {
      const productList = await products.fetchAllProducts();
      commit('setproductData', productList);
      return productList;
    },
  },
};

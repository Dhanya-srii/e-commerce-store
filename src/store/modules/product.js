import Vue from 'vue';
import { products } from '/src/api/products.js';

export const storeProducts = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
    selectedCategories: [],
    showFilter: false,
    favouritesListCount: 0,
    gridColumns: 4,
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

    setGridColumns(state, cols) {
      state.gridColumns = cols;
    },

    setproductData(state, productList) {
      state.productData = productList;
    },
    setSelectedCategories(state, categoryList) {
      state.selectedCategories = categoryList;
    },
    clearSelectedCategories(state) {
      state.selectedCategories = [];
    },

    removeOneSelectedCategory(state, categoryToRemove) {
      state.selectedCategories = state.selectedCategories.filter(
        (category) => category !== categoryToRemove
      );
    },
    toggleFilter(state) {
      state.showFilter = !state.showFilter;
    },
  },
  getters: {
    hasFavourites: (state) => {
      return Object.keys(state.favouritesList).length;
    },

  },
  actions: {
    async getAllProducts({ commit }) {
      const productList = await products.fetchAllProducts();
      commit('setproductData', productList);
      return productList;
    },

    async getAllProductsByCategories({ state, dispatch, commit }) {
      const categoryList = state.selectedCategories;
      if (categoryList.length === 0) {
        return dispatch('getAllProducts');
      } else {
        const filtered = await products.fetchProductCategories(categoryList);
        commit('setproductData', filtered);
      }
    },
  },
};

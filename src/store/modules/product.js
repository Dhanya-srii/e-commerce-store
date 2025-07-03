import Vue from 'vue';

import { products } from '/src/api/products.js';

import { addCart, updateCart, getAllCarts } from '/src/api/cart';
export const storeProducts = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
    selectedCategories: [],
    showFilter: false,
    gridColumns: 4,
    getCartProducts: {},
    cartProducts: [],
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
    setCartProducts(state, allCartProducts) {
      state.cartProducts = allCartProducts;
    },

    addProductToCart(state, { id, quantity }) {
      Vue.set(state.getCartProducts, id, { quantity });
    },

    updateProductQuantity(state, { id, quantity }) {
      if (state.getCartProducts[id]) {
        state.getCartProducts[id].quantity = quantity;
      }
    },

    removeProductFromCart(state, id) {
      Vue.delete(state.getCartProducts, id);
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

    hasFavourites: (state) => Object.keys(state.favouritesList).length,

    getCartProducts: (state) => state.getCartProducts,

    cartQuantity: (state) => (id) => state.getCartProducts[id]?.quantity || 0,

    getAddedCartProducts: (state) => {
      return state.cartProducts;
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

    async addToCart({ commit }, product) {
      await addCart({
        userId: 1,
        products: [{ id: product.id, quantity: 1 }],
      });
      commit('addProductToCart', { id: product.id, quantity: 1 });
    },

    async changeQuantity({ commit }, { id, quantity }) {
      if (quantity <= 0) {
        commit('removeProductFromCart', id);
      } else {
        await updateCart(1, [{ id, quantity }]);
        commit('updateProductQuantity', { id, quantity });
      }
    },
    
    async fetchUserCart({ commit }) {
      try {
        const userId = 1;
        const res = await getAllCarts(userId);
        const products = res.data.carts?.[0]?.products || [];
        commit('setCartProducts', products);
      } catch (e) {
        console.error('Failed to fetch cart by user:', e);
      }
    },
  },
};

import Vue from 'vue';
import { products } from '/src/api/products.js';
import { addCart } from '/src/api/cart.js';

export const storeProducts = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
    selectedCategories: [],
    showFilter: false,
    gridColumns: 4,
    cartProducts: [],
  },

  mutations: {
    updateFavList(state, product) {
      const id = product.id;
      if (state.favouritesList[id]) {
        Vue.delete(state.favouritesList, id);
      } else {
        Vue.set(state.favouritesList, id, product);
      }
      localStorage.setItem(
        'favouritesList',
        JSON.stringify(state.favouritesList)
      );
    },
    setCartProducts(state, products) {
      state.cartProducts = products;
    },
    updateCartQuantity(state, { id, quantity }) {
      const product = state.cartProducts.find((p) => p.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    setGridColumns(state, cols) {
      state.gridColumns = cols;
    },

    setProductData(state, products) {
      state.productData = products;
    },

    setSelectedCategories(state, categories) {
      state.selectedCategories = categories;
    },

    clearSelectedCategories(state) {
      state.selectedCategories = [];
    },

    removeOneSelectedCategory(state, category) {
      state.selectedCategories = state.selectedCategories.filter(
        (c) => c !== category
      );
    },

    toggleFilter(state) {
      state.showFilter = !state.showFilter;
    },
  },

  getters: {
    hasFavourites: (state) => Object.keys(state.favouritesList).length,
  },
  actions: {
    async getAllProducts({ commit }) {
      const productsList = await products.fetchAllProducts();
      commit('setProductData', productsList);
    },

    async getAllProductsByCategories({ state, commit, dispatch }) {
      if (!state.selectedCategories.length) {
        return dispatch('getAllProducts');
      }
      const filtered = await products.fetchProductCategories(
        state.selectedCategories
      );
      commit('setProductData', filtered);
    },
    async addCartProducts({ commit }, product) {
      try {
        const response = await addCart({
          userId: 5,
          products: [{ id: product.id, quantity: 1 }],
        });

        console.log('Full API response:', response.data);

        commit('setCartProducts', response.data);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    },
  },
};

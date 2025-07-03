import Vue from 'vue';
import { products } from '/src/api/products.js';
import { addCart } from '/src/api/cart';

export const storeProducts = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
    selectedCategories: [],
    showFilter: false,
    gridColumns: 4,
    cartProducts: [],
    addedCartProducts: [],
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

    addOrUpdateProductInCart(state, { product, quantity }) {
      const idx = state.cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (quantity <= 0) {
        // Remove item
        if (idx !== -1) state.cartProducts.splice(idx, 1);
        state.addedCartProducts = state.addedCartProducts.filter(
          (item) => item.id !== product.id
        );
      } else {
        // Update or add
        if (idx !== -1) {
          Vue.set(state.cartProducts, idx, { id: product.id, quantity });
        } else {
          state.cartProducts.push({ id: product.id, quantity });
        }

        const fullIdx = state.addedCartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (fullIdx !== -1) {
          Vue.set(state.addedCartProducts, fullIdx, { ...product, quantity });
        } else {
          state.addedCartProducts.push({ ...product, quantity });
        }
      }
    },

    removeProductFromCart(state, id) {
      state.cartProducts = state.cartProducts.filter((item) => item.id !== id);
      state.addedCartProducts = state.addedCartProducts.filter(
        (item) => item.id !== id
      );
    },
  },

  getters: {
    hasFavourites: (state) => Object.keys(state.favouritesList).length,
    cartQuantity: (state) => (id) => {
      return state.cartProducts.find((item) => item.id === id)?.quantity || 0;
    },
    getCartProducts: (state) => state.cartProducts,
    getAddedCartProducts: (state) => state.addedCartProducts,
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

    async addToCart({ commit }, product) {
      await addCart({
        userId: 5,
        products: [{ id: product.id, quantity: 1 }],
      });
      console.log('store product', product);

      commit('addOrUpdateProductInCart', { product, quantity: 1 });
    },

    updateQuantity({ commit }, { product, quantity }) {
      commit('addOrUpdateProductInCart', { product, quantity });
    },
  },
};

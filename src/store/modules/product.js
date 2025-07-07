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
    cartData: {
      products: [],
      total: 0,
      discountedTotal: 0,
      totalQuantity: 0,
    },
  },

  mutations: {
    updateFavList(state, product) {
      const id = product.id;
      if (state.favouritesList[id]) {
        Vue.delete(state.favouritesList, id);
      } else {
        Vue.set(state.favouritesList, id, product);
      }
      localStorage.setItem('favouritesList', JSON.stringify(state.favouritesList));
    },

    setCart(state, cart) {
      state.cartData = { ...cart };
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
      state.selectedCategories = state.selectedCategories.filter(c => c !== category);
    },
    toggleFilter(state) {
      state.showFilter = !state.showFilter;
    },
    setGridColumns(state, cols) {
      state.gridColumns = cols;
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
      if (!state.selectedCategories.length) return dispatch('getAllProducts');
      const filtered = await products.fetchProductCategories(state.selectedCategories);
      commit('setProductData', filtered);
    },

    async updateCart({ commit, state }, newProduct) {
      const cart = state.cartData.products;
      const existing = cart.find(p => p.id === newProduct.id);

      if (newProduct.quantityChange) {
        if (existing) {
          existing.quantity += newProduct.quantityChange;
          if (existing.quantity < 1) {
            const index = cart.indexOf(existing);
            cart.splice(index, 1);
          }
        }
      } else {
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...newProduct, quantity: 1 });
        }
      }

      try {
        const response = await addCart({
          userId: 5,
          products: cart.map(p => ({ id: p.id, quantity: p.quantity })),
        });
        commit('setCart', response.data);
      } catch (err) {
        console.error('Error syncing cart:', err);
      }
    },
  },
};

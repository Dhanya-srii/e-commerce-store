import Vue from 'vue';
import { products } from '/src/api/products.js';
import { cart } from '/src/api/cart.js';

export const storeProducts = {
  state: {
    favouritesList: JSON.parse(localStorage.getItem('favouritesList')) || {},
    productData: [],
    selectedCategories: [],
    showFilter: false,
    gridColumns: 4,
    allProducts: [],
    limit: 30,
    skip: 0,
    totalProducts: 194,
    loadMore: true,
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
      localStorage.setItem(
        'favouritesList',
        JSON.stringify(state.favouritesList)
      );
    },

    setCart(state, carts) {
      state.cartData = { ...carts };
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
    setGridColumns(state, cols) {
      state.gridColumns = cols;
    },
    resetProductsList(state) {
      state.limit = 30;
      state.skip = 0;
      state.allProducts = [];
      state.loadMore = true;
      console.log(state.limit, state.skip);
    },
  },

  getters: {
    hasFavourites: (state) => Object.keys(state.favouritesList).length,
  },

  actions: {
    async getAllProducts({ state, commit }) {
      try {
        if (state.loadMore) {
          const productsList = await products.fetchAllProducts(
            state.limit,
            state.skip
          );

          state.allProducts = state.allProducts.concat(productsList);

          state.skip += state.limit;
          if (state.allProducts.length >= state.totalProducts) {
            state.loadMore = false;
          }
          commit('setProductData', state.allProducts);
        }
      } catch (err) {
        alert('Error loading products:', err.message);
      }
    },

    async getAllProductsByCategories({ state, commit, dispatch }) {
      if (!state.selectedCategories.length) {
        commit('resetProductsList');
        dispatch('getAllProducts');
      }
      const filtered = await products.fetchProductCategories(
        state.selectedCategories
      );
      commit('setProductData', filtered);
    },

    async updateCart({ commit, state }, newProduct) {
      let carts = state.cartData.products;
      // if,else(if(if(if)),else(if)(else))
      if (newProduct.remove) {
        carts = carts.filter((p) => p.id !== newProduct.id);
      } else {
        const existing = carts.find((p) => p.id === newProduct.id);

        if (newProduct.quantityChange) {
          if (existing) {
            existing.quantity += newProduct.quantityChange;
            if (existing.quantity < 1) {
              carts = carts.filter((p) => p.id !== newProduct.id);
            }
          }
        } else {
          if (existing) {
            existing.quantity += 1;
          } else {
            carts.push({ ...newProduct, quantity: 1 });
          }
        }
      }
      if (carts.length > 0) {
        try {
          const response = await cart.addCart({
            userId: 5,
            products: carts.map((p) => ({ id: p.id, quantity: p.quantity })),
          });
          commit('setCart', response.data);
        } catch (err) {
          alert('Error syncing carts: ' + err.message);
        }
      } else {
        commit('setCart', {
          products: [],
          total: 0,
          discountedTotal: 0,
          totalQuantity: 0,
        });
      }
      state.cartData.products = carts;
    },
  },
};

import Vue from 'vue';
export const products = {
  state: {
    favourites: {},
  },
  mutations: {
    updateFavList(state, val) {
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
    },
  },
};

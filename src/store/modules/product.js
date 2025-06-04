import Vue from 'vue';
export const products = {
  state: {
    favourites: JSON.parse(localStorage.getItem('favourites')) || {},
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
        console.log('fav', state.favourites);
      }

      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
  },
};

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: [],
  },
  mutations: {
    toggle_fav(state, product) {
      const index = state.favourites.findIndex((p) => p.id === product.id);
      if (index === -1) {
        state.favourites.push(product);
      } else {
        state.favourites.splice(index, 1);
      }
    },
  },
  actions: {
    toggleFavourite({ commit }, product) {
      commit('toggle_fav', product);
    },
  },
  getters: {
    isFavourite: (state) => (id) => {
      return state.favourites.some((p) => p.id === id);
    },
    allFavourites: (state) => state.favourites,
  },
});

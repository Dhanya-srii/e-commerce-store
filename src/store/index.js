import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: {},
  },
  mutations: {
    toggle_fav(state, product) {
      const id = product.id;
      if (state.favourites[id]) {
        // Vue.delete(state.favourites, id);
      } else {
        Vue.set(state.favourites, id, product);
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
      return state.favourites[id];
    },
    allFavourites: (state) => {
      return Object.values(state.favourites);
    },
  },
});

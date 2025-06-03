import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourites: {},
  },
  mutations: {
    addFav(state, { id, product }) {
      state.favourites[id] = product;
    },
    removeFav(state, id) {
      delete state.favourites[id];
    },
  },
});

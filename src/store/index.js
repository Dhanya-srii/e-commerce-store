import Vue from 'vue';
import Vuex from 'vuex';
import { storeProducts } from './modules/product';
// import { users } from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    storeProducts,
    // users,
  },
});

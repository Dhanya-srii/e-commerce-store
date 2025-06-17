import Vue from 'vue';
import Vuex from 'vuex';
import { storeProducts } from './modules/product';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    storeProducts,
  },
});

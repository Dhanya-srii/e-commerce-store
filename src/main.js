import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store';
import { lazy } from './directives/lazy';

import { Rate } from 'element-ui';
import { Button } from 'element-ui';
import { Checkbox } from 'element-ui';
Vue.use(Rate);
Vue.use(Button);
Vue.use(Checkbox);
Vue.directive('lazy', lazy);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');

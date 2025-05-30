import Vue from "vue";
import App from "./App.vue";
import router from "./route/index";
export const EventBus = new Vue();

import { Rate } from "element-ui";
import { Button } from "element-ui";
Vue.use(Rate);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");

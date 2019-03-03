import Vue from "vue";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";

import App from "./App";

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

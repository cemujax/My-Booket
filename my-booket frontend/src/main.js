import Vue from "vue";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";

import App from "./App";
import moment from "moment";

Vue.use(Vuetify);
Vue.config.productionTip = false;
moment.locale("ko", {
  weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

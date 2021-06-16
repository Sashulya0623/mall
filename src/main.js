import Vue from "vue";
import App from "./App.vue";

// 导入router
import router from "./router/index.js";

// 设置事件总线
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  router:router,
  render: (h) => h(App),
}).$mount("#app");

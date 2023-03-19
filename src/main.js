import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";
import MyPagination from "./components/Pagination";
import "./mock/mockServer";
import "./plugins/swiper"; //加载swiper配置
import "./plugins/element-ui";
import "./plugins/validate";
import * as API from "@/api";
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, {
  // 内部自定义了一个指令lazy
  loading, // 指定未加载得到图片之前的loading图片
});

Vue.config.productionTip = false;
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(MyPagination.name, MyPagination);

// 创建或指定事件总线对象, 保存到Vue的原型上
// Vue.prototype.$bus = new Vue()

new Vue({
  // 1)创建或指定事件总线对象, 保存到Vue的原型上
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: (h) => h(App),
  router, //注册路由器 ===>所有组件都可以直接访问两个对象：$router与$route
  store, //注册vuex ===>所有组件都可以直接访问1个对象：$store
}).$mount("#app");

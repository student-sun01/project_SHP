import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router //注册路由器 ===>所有组件都可以直接访问两个对象：$router与$route
}).$mount('#app')

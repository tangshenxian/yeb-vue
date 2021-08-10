import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*element UI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {initMenu} from "@/utils/menu";

import 'font-awesome/css/font-awesome.css';

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token');
  if (token) {
    initMenu(router, store)
    next()
  } else {
    //是否跳转到登录页
    if (to.path === '/') {
      next()
    }
    next('/')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

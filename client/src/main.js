import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000/API',
  timeout: 1000
});

Vue.prototype.$jwt = jsonwebtoken;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

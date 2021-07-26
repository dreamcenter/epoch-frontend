import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/common.css'
import axios from 'axios'
import md5 from 'js-md5'
import cookie from 'vue-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(axios)
Vue.use(cookie)

Vue.config.productionTip = false

Vue.prototype.$md5 = md5

axios.interceptors.request.use((config) => {
  var token = cookie.get('token')
  if (token) {
    config.headers.common.authorization = token
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  return response
}, err => {
  var status = err.response.status
  console.log(status)
  if (status === 401) {
    cookie.delete('token')
    router.push('/mainpanel/login').catch(err => err)
  }
  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

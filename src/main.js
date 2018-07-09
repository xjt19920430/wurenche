// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
import Utiles from "./lib/config"
Vue.use(Utiles)
Vue.use(ElementUI);
Vue.prototype.$ajax = axios
Vue.prototype.$_ajax = _ajax
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
function _ajax(url, method, params) {
    const host = this.$url.baseUrl
    let methods = method || ''
    let paramss = params || ''
    if (methods === 'POST') {
        return this.$ajax({
            method: 'POST',
            url: host + url,
            data: paramss,
            // transformRequest: [function (data) {
            //     return qs.stringify(data)
            // }],
            // headers: {
            //     "token": this.$cookie.fetch("token"),
            //     "username": this.$cookie.fetch("userName"),
            //     "password": this.$cookie.fetch("password")
            // }
        })
    } else if (methods === 'GET' || methods === '') {
        return this.$ajax({
            url: host + url,
            params: paramss,
        //     headers: {
        //         "token": this.$cookie.fetch("token"),
        //         "username": this.$cookie.fetch("userName"),
        //         "password": this.$cookie.fetch("password")
        //     }
        })
    }

}
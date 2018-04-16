// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import { isAuth } from '@/utils'
import VueCookie from 'vue-cookie'

Vue.use(VueCookie)
FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const _import = require('./import-' + process.env.NODE_ENV)
export default new Router({
  routes: [
    { path: '/login', component: _import('login/index'), name: 'login', desc: '登录' },
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: { name: 'hello' },
      desc: '上左右整体布局',
      children: [
        { path: '/hello', component: _import('hello/index'), name: 'hello', desc: 'hello' },
        { path: '/goods', component: _import('goods/index'), name: 'goods', desc: 'goods' }
      ],
      //如果 token 为空 重定向至 登录页面
      beforeEnter(to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
          next({ name: 'login' })
        }
        next()
      }
    }
    // {
    //   path: '/',
    //   name: 'HelloFromVux',
    //   component: HelloFromVux
    // },
    // {
    //   path: '/hello',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})

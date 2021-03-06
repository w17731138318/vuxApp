import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const _import = require('./import-' + process.env.NODE_ENV)

const router =  new Router({
    // mode: 'history',
    beforeEach: function (to, from, next) {
        let token = Vue.cookie.get('token')
        if (!token || !/\S/.test(token)) {
            next('/')
        }
        next()
    },
    routes: [
        { path: '/', redirect: { name: 'login' } },
        { path: '/login', component: _import('login/index'), name: 'login', desc: '登录' },
        {
            path: '/layout',
            component: _import('layout/index'),
            name: 'layout',
            redirect: { name: 'message' },
            children: [
                { path: 'hello', component: _import('hello/index'), name: 'hello', desc: 'hello' },
                { path: 'message', component: _import('message/index'), name: 'message', desc: 'message' },
                { path: 'news', component: _import('news/index'), name: 'news', desc: 'news' },
                { path: 'goods', component: _import('goods/index'), name: 'goods', desc: 'goods' }
            ],
            //如果 token 为空 重定向至 登录页面
            beforeEnter(to, from, next) {
                let token = Vue.cookie.get('token')
                if (!token || !/\S/.test(token)) {
                    next('/')
                }
                next()
            }
        }
    ]
})
// router.beforeResolve ((to, from, next) => {
//   let token = Vue.cookie.get('token')
//   if (!token || !/\S/.test(token)) {
//     next({ path: '/' })
//   }
//   next()
// })
export default router
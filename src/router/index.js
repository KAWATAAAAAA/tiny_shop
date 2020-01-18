import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/Login'
Vue.use(VueRouter)

const routes = [
  {
    path:'/', //默认进入路由
    redirect:'/home' // 重定向至 home
  },
  {
    path:'/home',
    name:'home',
    component:Home
  },
  {
    path: '/Login',
    name:'Login',
    component:Login
  },
  {
    path: '**',   // 错误路由,需要放到最后一条？？？
    redirect: '/home'   //重定向
  },
]
// 全局路由守卫
/*router.beforeEach((to,from,next)=>{

})*/

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

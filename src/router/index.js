import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/Login'
import Person from '../views/Person'
import Upload from '../components/Upload'
Vue.use(VueRouter)

const routes = [

  {
    path:'/',
    name:'',
    component:Home
  },
  {
    path:'/user',
    name:'User',
    component:Person,
    children:[

    ]
  },
  {
    path: '/user/login',
    name:'Login',
    component:Login
  },
  {
    path:'/upload',
    name:'Upload',
    component:Upload
  }
]
// 全局路由守卫
/*router.beforeEach((to,from,next)=>{

})*/

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

// 消除路由跳转相同地址的报错
/*
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
*/

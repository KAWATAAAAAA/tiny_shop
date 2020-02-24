import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Upload from '../components/Upload'
import Chat from '../components/Chat'
import BaseInfo from '../components/User/BaseInfo'
import InfoEdit from '../components/User/InfoEdit'
import StoreEdit from '../components/Store/StoreEdit'
import AddGoods from '../components/Store/AddGoods'
import MyGoodsList from '../components/Store/MyGoodsList'

Vue.use(VueRouter)

const routes = [

  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path: '/login',
    name:'Login',
    component:Login
  },
  {
    path: '/register',
    name:'Register',
    component:Register
  },
  {
    path:'/user/:id',
    component:() => import ('../views/User'),
    children:[
      {
        path:'',
        name:'BaseInfo',
        component:BaseInfo
      },
      {
        path: 'edit',
        name: 'InfoEdit',
        meta: { requiresAuth: true },
        component: InfoEdit
      },
      {
        path:'store/edit',
        name:'store-edit',
        meta: { requiresAuth: true },
        component:StoreEdit
      }
    ]

  },
  {
    path:'/store/:id',
    name:'Store',
    meta: { requiresAuth: true },
    component:() => import('../views/Store'),
    children:[
      {
        path: '',
        name: 'MyGoodsList',
        component: MyGoodsList,
        meta: { requiresAuth: true }
      },
      {
        path: 'add-goods',
        name: 'AddGoods',
        component: AddGoods,
        meta: { requiresAuth: true }
      },

    ]
  },
  {
    path:'/upload',
    name:'Upload',
    meta: { requiresAuth: true },
    component:Upload
  },
  {
    path:'/chat',
    name:'Chat',
    meta: { requiresAuth: true },
    component:Chat
  },

]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

// 全局路由守卫
router.beforeEach((to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)){
    if(JSON.parse(window.sessionStorage.getItem('userStatus')) || window.localStorage.getItem('token'))
    {
      next()
    }
    else {
      console.log("未登录")
      next({
        path:'/login',
      })
    }
  }
  else
    next()
})

// 消除路由跳转相同地址的报错
/*
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
*/

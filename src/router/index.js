import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

import Register from '../components/Register'

import BaseInfo from '../components/User/BaseInfo'
import InfoEdit from '../components/User/InfoEdit'
import OrderHistory from '../components/User/OrderHistory'
import StoreEdit from '../components/Store/StoreEdit'
import AddGoods from '../components/Store/AddGoods'
import MyGoodsList from '../components/Store/MyGoodsList'
import AddAddress from '../components/AddAddress'
import AddressInfo from '../components/BuyNowConfirm/AddressInfo'
import AddressEdit from '../components/AddressEdit'
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
    component:() => import('../components/Login')
  },
  {
    path: '/register',
    name:'Register',
    component:Register
  },
  {
    path:'/user/:userId',
    component:() => import (/*webpackChunkName : "group-user"*/ '../views/User'),
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
        path: 'address-list',
        name: 'AddressInfo',
        meta: { requiresAuth:true },
        component: AddressInfo
      },
      {
        path:'address/add',
        name:'AddAddress',
        component: AddAddress
      },
      {
        path: 'address/edit/:id',
        name: 'AddressEdit',
        component: AddressEdit
      },
      {
        path:'store/edit',
        name:'store-edit',
        meta: { requiresAuth: true },
        component:StoreEdit
      },
      {
        path: 'order-history',
        name: 'OrderHistory',
        meta: { requiresAuth: true },
        component: OrderHistory
      }
    ]

  },
  {
    path:'/store/:storeId',
    meta: { requiresAuth: true },
    component:() => import(/*webpackChunkName : "group-store"*/ '../views/Store'),
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
    component:() => import('../components/Upload')
  },
  {
    path:'/chat',
    name:'Chat',
    meta: { requiresAuth: true },
    component:() => import('../components/Chat')
  },
  {
    path:'/goods-cascade',
    name:'GoodsCascade',
    component:() => import('../views/GoodsCascade')
  },
  {
    path:'/buy-now-confirm',
    name:'BuyNowConfirm',
    component:() => import('../views/BuyNowConfirm')
  },
  {
    path:'/alipay/payment-completed',
    name:'PaymentCompleted',
    component:() => import('../views/PaymentCompleted')
  },
  {
    path:'/alipay/async-notify',
    name:'AsyncNotify',
    component:() => import('../views/NotifyUrl')
  }
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

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


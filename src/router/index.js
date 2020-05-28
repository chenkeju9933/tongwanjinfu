import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/content/Home'], resolve)
    },
    {
      path: '/cutdown',
      name: 'cutdown',
      component: resolve => require(['../components/content/cutdown/Cutdown'], resolve)
    },
    {
      path: '/allList',
      name: 'allList',
      component: resolve => require(['../components/content/discountList/discountList'], resolve)
    },
    {
      path: '/activityDetail/index',
      name: 'activityDetail',
      component: resolve => require(['../components/content/Detail/detail'], resolve)
    },
    {
      path: '/cutdetail/:id',
      name: 'cutDownDetail',
      component: resolve => require(['../components/content/cutdown/cutDownDetail'], resolve)
    },
    {
      path: '/myinfo',
      name: 'myInfo',
      component: resolve => require(['../components/content/Main'], resolve)
    },
    {
      path: '/mycutlist',
      name: 'myCutDownList',
      component: resolve => require(['../components/content/cutdown/myCutDownList'], resolve)
    },
    {
      path: '/mydiscountlist',
      name: 'myDiscountList',
      component: resolve => require(['../components/content/discountList/myDiscountList'], resolve)
    },
    {
      path: '/addaddress',
      name: 'addAddress',
      component: resolve => require(['../components/content/address/addAddress'], resolve)
    },
    {
      path: '/myaddress',
      name: 'myAddress',
      component: resolve => require(['../components/content/address/myAddress'], resolve)
    },
    {
      path: '/createorder',
      name: 'createOrder',
      component: resolve => require(['../components/content/order/fillOrder'], resolve)
    },
    {
      path: '/myorderlist',
      name: 'myOrderList',
      component: resolve => require(['../components/content/order/orderList'], resolve)
    },
    {
      path: '/orderdetail',
      name: 'orderDetail',
      component: resolve => require(['../components/content/order/orderDetail'], resolve)
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

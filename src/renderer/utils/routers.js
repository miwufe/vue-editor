import layout from '@/views/layout/index.vue'
let routers = [
  {
    path: '/',
    redirect: '/index',
    name: 'base',
    meta: {}
  },
  {
    path: '/index',
    // name: 'index',
    redirect: '/index/index',
    component: layout,
    meta: {},
    children: [
      {
        path: '/index/index',
        name: 'index-index',
        meta: {
          title: '首页',
          icon: 'index'
        },
        component: () => import('@/views/index/index.vue')
      }
    ]
  }
]
export default routers

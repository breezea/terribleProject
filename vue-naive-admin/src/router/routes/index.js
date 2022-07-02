import Layout from '@/layout/index.vue'
import Home from '@/views/dashboard/index.vue'

import {
  IconAlert,
  IconChart,
  IconGitee,
  IconGithub,
  IconHome,
  IconLink,
  IconMenu,
  IconVue,
} from '@/components/AppIcons'

export const basicRoutes = [
  
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
  {
    name: 'REDIRECT',
    path: '/redirect',
    component: Layout,
    isHidden: true,
    children: [
      {
        name: 'REDIRECT_NAME',
        path: '',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },

  {
    name: 'Dashboard',
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: 'Dashboard',
      icon: IconChart,
    },
    children: [
      {
        name: 'Home',
        path: 'home',
        component: Home,
        meta: {
          title: '首页',
          icon: IconHome,
        },
      },
    ],
  },

  // {
  //   name:"mapPage",
  //   path:"/map",
  //   component: Layout,
  //   meta: {
  //     title: '地图',
  //     icon: IconChart,
  //   },
  //   children: [
  //     {
  //       name: 'map-main',
  //       path:'mapPage',
  //       component: () => import('@/views/map/map.vue'),
  //       meta:{
  //         title:'地图',
  //         icon:IconHome,
  //       }
  //     }
  //   ]
  // },

  // {
  //   name: 'ErrorPage',
  //   path: '/error-page',
  //   component: Layout,
  //   redirect: '/error-page/404',
  //   meta: {
  //     title: '错误页',
  //     icon: IconAlert,
  //   },
  //   children: [
  //     {
  //       name: 'ERROR-404',
  //       path: '404',
  //       component: () => import('@/views/error-page/404.vue'),
  //       meta: {
  //         title: '404',
  //         icon: IconAlert,
  //       },
  //     },
  //   ],
  // },

  // {
  //   name: 'Test',
  //   path: '/test',
  //   component: Layout,
  //   meta: {
  //     title: '基础功能测试',
  //     icon: IconMenu,
  //   },
  //   children: [
  //     {
  //       name: 'Unocss',
  //       path: 'unocss',
  //       component: () => import('@/views/test-page/TestUnocss.vue'),
  //       meta: {
  //         title: '测试unocss',
  //       },
  //     },
  //     {
  //       name: 'Message',
  //       path: 'message',
  //       component: () => import('@/views/test-page/TestMessage.vue'),
  //       meta: {
  //         title: '测试Message',
  //         role: ['admin'],
  //       },
  //     },
  //     {
  //       name: 'Dialog',
  //       path: 'dialog',
  //       component: () => import('@/views/test-page/TestDialog.vue'),
  //       meta: {
  //         title: '测试Dialog',
  //       },
  //     },
  //     {
  //       name: 'TestKeepAlive',
  //       path: 'keep-alive',
  //       component: () => import('@/views/test-page/TestKeepAlive.vue'),
  //       meta: {
  //         title: '测试Keep-Alive',
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },
  // 外部链接
  // {
  //   name: 'ExternalLink',
  //   path: '/external-link',
  //   component: Layout,
  //   meta: {
  //     title: '外部链接',
  //     icon: IconLink,
  //   },
  //   children: [
  //     {
  //       name: 'LinkGithubSrc',
  //       path: 'https://github.com/zclzone/vue-naive-admin',
  //       meta: {
  //         title: '源码 - github',
  //         icon: IconGithub,
  //       },
  //     },
  //     {
  //       name: 'LinkGiteeSrc',
  //       path: 'https://gitee.com/zclzone/vue-naive-admin',
  //       meta: {
  //         title: '源码 - gitee',
  //         icon: IconGitee,
  //       },
  //     },
  //     {
  //       name: 'LinkDocs',
  //       path: 'https://zclzone.github.io/vue-naive-admin-docs',
  //       meta: {
  //         title: '文档 - vuepress',
  //         icon: IconVue,
  //       },
  //     },
  //   ],
  // },
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

// const modules = import.meta.globEager('./modules/*.js')
// const example_modules = import.meta.globEager('./modules/example.js')
const acid_modules = import.meta.globEager('./modules/acid.js')
const goout_modules = import.meta.globEager('./modules/goOut.js')
const map_modules = import.meta.globEager('./modules/infoMap.js')
const asyncRoutes = []
// Object.keys(example_modules).forEach((key) => {
//   asyncRoutes.push(...example_modules[key].default)
// })
Object.keys(map_modules).forEach((key) => {
  asyncRoutes.push(...map_modules[key].default)
})
Object.keys(acid_modules).forEach((key) => {
  asyncRoutes.push(...acid_modules[key].default)
})
Object.keys(goout_modules).forEach((key) => {
  asyncRoutes.push(...goout_modules[key].default)
})


export { asyncRoutes }

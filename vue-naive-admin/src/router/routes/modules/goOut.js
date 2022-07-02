import { IconMenuTable } from '@/components/AppIcons'
import Layout from '@/layout/index.vue'
import { markRaw } from 'vue'

export default [
  {
    name: 'goOut',
    path: '/go',
    component: Layout,
    redirect: '/go/out',
    meta: {
      title: '组件示例',
      role: ['admin'],
    },
    children: [
      {
        name: 'out',
        path: 'out',
        component: () => import('@/views/goOut/index.vue'),
        redirect: '/go/out/table',
        meta: {
          title: '外出',
          role: ['admin'],
          icon: markRaw(IconMenuTable),
        },
        children: [
          {
            name: 'goOutTable',
            path: 'table',
            component: () => import('@/views/goOut/post/outTable.vue'),
            meta: {
              title: '外出申请',
              role: ['admin'],
            },
        },
        //         {
        //   name:'map',
        //   path:'map',
        //   component:() => import('@/views/map/cell/index.vue'),
        //   meta:{
        //     title:"地图",
        //     role:['admin'],
        //   }
        // }
        ],
      },
    ],
  },
]

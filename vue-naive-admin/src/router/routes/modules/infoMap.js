// import { IconMenuTable } from '@/components/AppIcons'
// import Layout from '@/layout/index.vue'
// import { markRaw } from 'vue'

// export default [
//   {
//     name: 'infos',
//     path: '/info',
//     component: Layout,
//     redirect: '/info/map',
//     meta: {
//       title: '组件示例',
//       role: ['admin'],
//     },
//     children: [
//       {
//         name: 'map',
//         path: 'map',
//         component: () => import('@/views/map/index.vue'),
//         redirect: '/info/map/statics',
//         meta: {
//           title: '地图',
//           role: ['admin'],
//           icon: markRaw(IconMenuTable),
//         },
//         children: [
//           {
//             name: 'statics',
//             path: 'satatics',
//             component: () => import('@/views/map/mpa.vue'),
//             meta: {
//               title: '疫情分布',
//               role: ['admin'],
//             },
//         },
//         {
//             name:"cells",
//             path:"cells",
//             component:() => import('@/views/map/cell/cells.vue'),
//             meta:{
//                 title:'新建小区',
//                 role:['admin'],
//             }
//         }
//         ],
//       },
//     ],
//   },
// ]

// import { IconMenuTable } from '@/components/AppIcons'
// import Layout from '@/layout/index.vue'
// import { markRaw } from 'vue'

// export default [
//   {
//     name: 'mymap',
//     path: '/map',
//     component: Layout,
//     redirect: '/map/show',
//     meta: {
//       title: '组件示例',
//       role: ['admin'],
//     },
//     children: [
//       {
//         name: 'showmap',
//         path: 'show',
//         component: () => import('@/views/map/index.vue'),
//         redirect: '/map/show/statics',
//         meta: {
//           title: '地图',
//           role: ['admin'],
//           icon: markRaw(IconMenuTable),
//         },
//         children: [
//           {
//             name: 'statics',
//             path: 'statics',
//             component: () => import('@/views/map/components/statics.vue'),
//             meta: {
//               title: '数据',
//               role: ['admin'],
//             },
//           },
//           {
//             name: 'cells',
//             path: 'cells',
//             component: () => import('@/views/map/cell/cells.vue'),
//             meta: {
//               title: '小区',
//               role: ['admin'],
//             },
//           },
//         ],
//       },
//     ],
//   },
// ]


import { IconMenuTable } from '@/components/AppIcons'
import Layout from '@/layout/index.vue'
import { markRaw } from 'vue'

export default [
  {
    name: 'sss',
    path: '/map',
    component: Layout,
    redirect: '/map/show',
    meta: {
      title: '组件示例',
      role: ['admin'],
    },
    children: [
      {
        name: 'show',
        path: 'show',
        component: () => import('@/views/map/index.vue'),
        redirect: '/map/show/statics',
        meta: {
          title: '地图',
          role: ['admin'],
          icon: markRaw(IconMenuTable),
        },
        children: [
          {
            name: 'statics',
            path: 'statics',
            component: () => import('@/views/map/components/map.vue'),
            meta: {
              title: '疫情统计',
              role: ['admin'],
            },
        },
        {
          name:'map',
          path:'map',
          component:() => import('@/views/map/cell/index.vue'),
          meta:{
            title:"创建小区",
            role:['admin'],
          }
        },
        {
          name:"editorCells",
          path:"edioterCells",
          component:()=>import("@/views/map/editorcell/index.vue"),
          meta:{
            title:'编辑小区',
            role:['admin'],
          }
        }
        ],
      },
    ],
  },
]

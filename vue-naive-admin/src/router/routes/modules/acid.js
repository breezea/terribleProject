// import { IconMenuTable } from "@/components/AppIcons";
// import Layout from "@/layout/index.vue";
// import {markRaw} from "vue";

// export default[
//     {
//         name:"Example",
//         path:"/example",
//         component:Layout,
//         redirect:'/nucleicacide',
//         meta:{
//             title:'核酸',
//             role:['admin'],
//             icon:markRaw(IconMenuTable),
//         },
//         children:[
//             {
//                 name:"acidTable",
//                 path:"table",
//                 component:() => import('@/views/nucleicacid/index.vue'),
//                 meta:{
//                     title:'核酸报告',
//                     role:['admin'],
//                 }
//             }
//         ]
//     }
// ]
import { IconMenuTable } from '@/components/AppIcons'
import Layout from '@/layout/index.vue'
import { markRaw } from 'vue'

export default [
  {
    name: 'nucleicacid',
    path: '/info',
    component: Layout,
    redirect: '/info/table',
    meta: {
      title: '组件示例',
      role: ['admin'],
    },
    children: [
      {
        name: 'acidTable',
        path: 'table',
        component: () => import('@/views/nucleicacid/index.vue'),
        redirect: '/info/table/nucleicacid',
        meta: {
          title: '核酸',
          role: ['admin'],
          icon: markRaw(IconMenuTable),
        },
        children: [
          {
            name: 'acidPostList',
            path: 'nucleicacid',
            component: () => import('@/views/nucleicacid/post/acidtable.vue'),
            meta: {
              title: '核酸信息',
              role: ['admin'],
            },
        },
        ],
      },
    ],
  },
]

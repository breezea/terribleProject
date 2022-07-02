import {h, ref} from 'vue'
import { NImage } from 'naive-ui'
import { acidData } from '@/api/info'

export const usePostTable = () => {
    // init refs
    const loading = ref(false)
    const tableData = ref([])
    const columns  = ref([])

    async function initTableData() {
        loading.value = true
        tableData.value = await getacidTableData()
        loading.value = false
    }

    async function handleDelete(row){

    }

    async function handleRecommend(row){
    
    }
    function initColumns(){
        columns.value = [
            {title:'id', key:'id', width:20 },
            {title:'姓名', key:'name', width:40 },
            {title:'电话',key:'phone',width:80},
            {
                title:"图片",
                key:"url",
                width:100,
                render(row){
                    return h(NImage,{
                        'src':'http://'+row.url,
                         style: [
                            { width: '150px' }, 
                            { height: '100px'},
                        ]
                    })
                }
            },
            {title:'提交时间',key:'submittime',width:200},
        ]
    }

    async function getacidTableData(){
        try {
            const res = await acidData(
                {
                    pageNo:1,
                    pageSize:10,
                }
            )
            console.log(res.data)
            if (res.code == 200) {
                return res.data
            }
            console.warn(res.message)
            return []
            
        } catch(err){
            console.log(err)
            return []
        }
    }

    return {
        loading,
        columns,
        tableData,
        initColumns,
        initTableData,        
    }
}


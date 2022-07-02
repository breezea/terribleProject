<template>
<div>
    <n-data-table
        mt-20
        :columns="columns"
        :data="tableData"

    ></n-data-table>

</div>
</template>

<script setup>
import { axiosMo as request } from '@/utils/http'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { usePostTable } from './useOutTable'

const router  = useRouter()
const pagination = ref({ pageSize: 10 })
const { loading, columns, tableData, initColumns, initTableData } = usePostTable()

onBeforeMount(()=>{
    initColumns()
    initTableData()
})

console.log(
    {
        loading,
        columns,
        tableData,
        initColumns,
        initTableData
    }
)
console.log('columns',columns.value)
// axios.post("/moa/getAcid",
// {
//     name:null,
//     phone:null,
//     type:null,
//     building:null,
//     house:null,
//     submittime:null,
//     endtime:null,
//     pageNo:1,
//     pageSize:10
// }
// )
// .then(res =>{console.log(res.data)})
// .catch(err =>{console.log(err)})

// function test(){
//     console.log('test');
//     request.post(
//         '/getAcid',
//         {
//     name:null,
//     phone:null,
//     type:null,
//     building:null,
//     house:null,
//     submittime:null,
//     endtime:null,
//     pageNo:1,
//     pageSize:10
// }
//     ).then(
//         res=>console.log(res),
//         err=>console.log(err)
//     )
// }
</script>
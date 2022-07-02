import {h, ref} from 'vue'
import { NButton } from 'naive-ui'
import { outData, outReject } from '@/api/info'

export const usePostTable = () => {
    // init refs
    const loading = ref(false)
    const tableData = ref([])
    const columns  = ref([])

    async function initTableData() {
        loading.value = true
        tableData.value = await getOutTableData()
        loading.value = false
    }

    async function handleReject(row){
        console.log('123132')
        if (row && row.id) {
            $dialog.confirm({
                content: '确定拒绝？',
                confirm() {
                    // console.log(row)
                    outReject(row.id,2).then(
                        res => {
                            console.log(res)
                            $message.success('拒绝成功')
                            initTableData()
                        },
                        err=>{
                            $message.error('拒绝失败')
                            console.log(err)
                        })
                    // let res = await outReject(row.id,2)
                    // console.log(res)
                }
            })
        }
    }

    async function handleAgree(row){
    
    }
    function initColumns(){
        columns.value = [
            {title:'id', key:'id', width:20 },
            {title:'姓名', key:'username', width:40 },
            {title:'原因', key:'reason', width:40 },
            {title:'开始时间',key:"starttime",width:60},
            {title:'结束时间',key:"endtime",width:60},
            {title:'温度',key:"temperature",width:40},
            {
                title:"操作",
                key:"actions",
                width:120,
                align:'center',
                fixed:'right',
                render(row){
                    return [
                        h(NButton,{
                            size: 'small',
                            type: 'primary',
                            style: 'margin-left: 15px;',
                            onClick: () => handleAgree(row),
                        },
                        { default: () => '同意' }),
                        h(NButton,{
                            size: 'small',
                            type: 'error',
                            style: 'margin-left: 15px;',
                            onClick: () => handleReject(row),
                        },
                        { default: () => '拒绝' }),


                    ]
                }
            }
        ]
    }

    async function getOutTableData(){
        try {
            const res = await outData(
                // {
                //     params:{
                //         pageNo:1,
                //         pageSize:99,
                //     }
                // }
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


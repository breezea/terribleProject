import { ref, h } from 'vue'
import { NImage } from 'naive-ui';
import { acidData, outData } from '@/api/info';

export const userAreaTable = () => {

    const columns = ref([]);
    const data = ref([]);
    const menuOptions = ref([])

    function changeTableData(){

        console.log('changeTableData')
    }
    async function getAicdData(){
      await acidData(
        {
          pageNo:1,
          pageSize:99,
        }
      ).then(
        res => {
          console.log(res.data)
          data.value = res.data
          columns.value = [
            {title:'id',key:'id',width:20},
            {title:'姓名',key:'name',width:40},
            {title:'电话',key:'phone',width:80},
            {title:"房间号",key:"house",width:80},
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

            }
          ]
        }
      , err => {
        console.log(err)
      })
    }

    async function getOutData(){
      await outData().then(
        res=>{
          console.log(res.data)
          data.value = res.data
          columns.value = [
            {title:'id',key:'id',width:20},
            {title:'姓名',key:'username',width:40},
            {title: '原因',key:'reason',width:80},
            {title:"分类",key:"type",width:80},
            {title:"温度",key:"temperature",width:80},
          ]
          console.log(data.value)
        }
      )
    }
   

    

    console.log(menuOptions.value)
    return {
        menuOptions,
        initMenus,
        columns,
        data,
    }
}
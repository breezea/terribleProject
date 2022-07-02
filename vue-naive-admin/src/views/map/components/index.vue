<template>
    <div>
        mapInfo
        <n-space>
            <n-button @click="showModal=true">使用渲染函数</n-button>
        </n-space>
        <n-modal v-model:show="showModal" class="hopeModel">
            <div class="areaInfoContain">
                <n-layout>
                    <n-layout-header style="text-align:center" class="areaInfoHeader">楼栋信息</n-layout-header>
                    <n-layout has-sider>
                        <n-layout-sider content-style="padding: 24px;">
                            <n-menu
                                v-model:value="activeMenu"
                                :options="menuOptions"

                            ></n-menu>
                        </n-layout-sider>
                        <n-layout-content content-style="padding: 24px;">
                            <n-data-table 
                                :columns="columns"
                                :data="data"
                            ></n-data-table>

                        </n-layout-content>
                    </n-layout>
                </n-layout>

            </div>
        </n-modal>
    </div>

</template>

<script setup>
    import { h, ref, onBeforeMount} from "vue";
    import { acidData, outData } from "@/api/info";
    import { NImage } from "naive-ui";

    // 接受父组件传递的数据
    const props = defineProps({
        'controlInfoShow':{type:Boolean,default:false},
        
    })
    console.log('props is :',props.controlInfoShow)
    const menuOptions = ref([])
    const columns = ref([])
    const data = ref([]) 
    const showModal = ref(false);
    const activeMenu = ref(null);

    onBeforeMount(()=>{
        initMenus()
        getAicdData()
    })
    
       function changeTableData(){

        console.log('changeTableData')
    }
    
     // getAicdData()
    function initMenus(){
        menuOptions.value = [
            {
                label: () => h("div", {
                    onClick: getAicdData 
                }, "核酸情况"),
                key: "hxqk",
            },
            {
                label: ()=> h("div",{
                    onClick: getOutData
                },"外出情况"),
                key: "out-of-home-situation",
            },
            {
                label: ()=> h("div",{
                    onClick: changeTableData
                },"重点管控人员"),
                key: "important-control-personnel",
            },
            {
                label: ()=> h("div",{
                    onClick: changeTableData
                },"打卡情况"),
                key: "clock-in-situation",
            },
            {
            label: "舞，舞，舞",
            key: "dance-dance-dance",
            children: [
              {
                type: "group",
                label: "人物",
                key: "people",
                children: [
                  {
                    label: "叙事者",
                    key: "narrator",
                  },
                  {
                    label: "羊男",
                    key: "sheep-man",
                  }
                ]
              },
              {
                label: "饮品",
                key: "beverage",
                children: [
                  {
                    label: "威士忌",
                    key: "whisky"
                  }
                ]
              },
              {
                label: "食物",
                key: "food",
                children: [
                  {
                    label: "三明治",
                    key: "sandwich"
                  }
                ]
              },
              {
                label: "过去增多，未来减少",
                key: "the-past-increases-the-future-recedes"
              }
            ]
          }
        ];
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

            },
            {title:'电话',key:'phone',width:80},
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
   


</script>

<style lang="scss">
.div{
    width:100px;
    height: 100px;
    background-color: aquamarine;
}
.areaInfoContain{
    width:80%;
    opacity: 0.8;
    .areaInfoHeader{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
}
.hopeModel{
    width:80%;
    max-height: 140rem;
    overflow-y: scroll;
    background-color: antiquewhite;
}
</style>
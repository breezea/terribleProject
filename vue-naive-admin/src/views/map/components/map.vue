<template>
<div>
    <!-- <AreaInfo :controlInfoShow="controlInfoShow"></AreaInfo> -->
    <div class="cell-select">
        <span class="cell-select-title">切换小区</span>
        <n-space vertical>
            <n-select v-model="cellValue" :options="cellData" :on-update:value="setCellMessage" />
        </n-space>
    </div>


    <n-modal v-model:show="showModal" class="hopeModel">
        <div class="areaInfoContain">
            <n-layout>
                <n-layout-header style="text-align:center" class="areaInfoHeader">楼栋信息:{{currentbuildingName}}</n-layout-header>
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

    <div id="container"></div>
</div>

</template>

<script setup>
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { shallowRef, onMounted, ref, onBeforeMount, h } from 'vue';
    import AreaInfo from '@/views/map/components/index.vue';
    import { acidData, outData, signData } from '@/api/info';
    import { NImage } from 'naive-ui';
    import axios from 'axios';

    const cellData = ref([])
    const cellValue = ref([])
    const cellName = ref('')
    
    const data = ref([])
    const columns = ref([])
    const activeMenu = ref(null)
    const menuOptions = ref([])
    const showModal = ref(false);

    const currentbuilding = ref('')
    const currentbuildingName = ref('')
    const controlInfoShow = ref(false)
    const map = shallowRef(null)
    const markers = []
    const aaMap = ref(null);
    var lnglats = ref([
        // [ 116.029292,28.679736 ],//唯义楼
        // [ 116.032087,28.68138 ], //图书馆
        // [ 116.024465,28.683188 ] ,// 小杏岭
    ]);

    // var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

    onMounted(() => {
        // return 
        AMapLoader.load({
            key:"c037179b07954439f9a9e881d213da45",  //设置您的key
            version:'2.0',
            plugins:['AMap.ToolBar','AMap.Driving'],
            AMapUI:{
                version:"1.1",
                plugins:[],
            },
            loca:{
                version:"2.0.0"
            }
        }).then(AMap => {
            // 保存AMap对象
            aaMap.value = AMap;
            console.log('map is :',map)
            map.value = new AMap.Map("container",{
                rotateEnable:true,
                pitchEnable:true,
                rotation:-15,
                viewMode:"3D",
                pitch:1,
                zoom:17,
                zooms:[2,22],
                center:[116.033474,28.680412],
            });
            
         
            map.value.setFitView();

            // add map event listener
            map.value.on('click', showInfoClick)

        }).catch(e => {
            console.log(e);
        })
    })

    onBeforeMount(() => {
        cellInfo()
        initMenus()
        getAicdData()
    })
    // 初始化cell信息
    function cellInfo(){
        axios.get('/zhang/cmsuser/community/listAllCommunity',
            {
                headers: {
                    'Authorization':localStorage.getItem('authorization')
                }
            }
        ).then(
            res => {
                console.log('所有的小区信息',res.data.data)
                for(let i=0;i<res.data.data.length;i++){
                   cellData.value.push({
                       label:res.data.data[i].communityName,
                       value:res.data.data[i].communityId
                       })
                }
                console.log('cellData',cellData.value)
            },
            err => {
                console.log('获取小区信息失败',err)
            }

        )
    }


    function setCellMessage(e){
        console.log('更改当前小区信息',e)
        // 清楚残留物
        try{
            console.log(markers)
            for(let i=0;i<markers.length;i++){
                map.value.remove(markers[i])
            }
        }catch(e){
            console.log('没有残留物')
        }

        let token = localStorage.getItem('authorization')
        let imageUrl = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
        console.log(aaMap)
        let icon = new aaMap.value.Icon({
            size: new aaMap.value.Size(40,40),
            image: imageUrl,
            imageSize: new aaMap.value.Size(40,40),
        })

        // 获取小区的数据
        axios.get('/zhang/cmsuser/community/getCommunity?communityId='+e,{
            headers: {
                'Authorization':token
            }
        }).then(
            res=>{
                console.log('成功获取小区信息')
                // 调整地图中心
                map.value.setCenter(eval(res.data.data.communityLnglat))
                //  设置地图缩放级别
                map.value.setZoom(18)

            }
        )

        // 获取小区的数据
        axios.get('/zhang/cmsuser/building/viewBuilding?communityId='+e,{
            headers: {
                'Authorization':token
            }
        }).then(
            res=>{
                console.log('成功获取小区的楼栋',res.data)
                // 将小区的楼栋画出来
                let temp = res.data.data
                for(let i=0;i<temp.length;i++){
                    // 创建icon
                    let labelContent = "<div class='label'>"+temp[i].buildingName+"</div>"
                    let marker = new aaMap.value.Marker({
                        position:eval(temp[i].buildingLnglat),
                        icon:icon,
                        offset: new aaMap.value.Pixel(-20,-20),
                        label:{
                            content:labelContent,
                            direction:"right",
                            offset:new aaMap.value.Pixel(0,0),
                        }
                    })

                    // 添加点击事件
                    marker.on('click',(e)=>{
                        console.log('点击事件',e)
                        console.log(temp[i])
                        currentbuilding.value = temp[i].buildingId
                        currentbuildingName.value = temp[i].buildingName
                        showModal.value = true

                    })

                    // 添加到地图
                    markers.push(marker)
                    map.value.add(marker)
            }

            }).catch(err=>{
                console.log('获取小区的楼栋失败',err)
            })
    
    }

    function changeTableData(){
        console.log('changeTableData')
    }

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
                    onClick: imPeopleData
                },"重点管控人员"),
                key: "important-control-personnel",
            },
            {
                label: ()=> h("div",{
                    onClick: getOutData
                },"打卡情况"),
                key: "clock-in-situation",
            },
           
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

    function imPeopleData(){
        console.log('获取重点管控人员信息')
        console.log(localStorage.getItem('authorization'))
        axios.post('/zhang/cmsuser/sys-user/viewFocusUser?communityId=1',{},{
            headers: {'Authorization':localStorage.getItem('authorization')}
        }).then(
            res=>{
                console.log('查看重点管控人员数据',res)
                data.value = res.data.data
                columns.value = [
                    {title:'id',key:"userId",width:20},
                    {title:'姓名',key:"realName",width:40},
                    {title:'性别',key:"gender",width:40},
                    {title:'电话',key:'phoneNumber',width:80}
                ]
            },
            err=>{
                console.log(err)
            }
        )
    }
    // imPeopleData()

    async function getSignData(){
        await signData().then(
            res=>{
                console.log(res)
                data.value = res.data
                columns.value = [
                    {title:'id',key:'id',width:20},
                    {title:'姓名',key:'username',width:40},
                    {title:'是否健康',key:'healthy',width:40},
                    {title:'温度',key:'temperature',width:40},
                ]
            },
            err=>{
                console.log('获取信息失败',err)
            }
        )
    }
    // getSignData()

    function showInfoClick(e){
        console.log( '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置点击了地图！')
        console.log('message about click:',e)
    }
    

</script>

<style scoped lang="scss">
    #container{
        padding:0;
        margin:0;
        width:100%;
        height:100%;
    }
    .cell-select{
        position:absolute;
        top:60px;
        right:10px;
        width: 220px;
        z-index: 10;
    }

    .cell-select-title{
        font-size: 14px;
        color: #6b8a8e;
        padding-left: 10px;
    }
</style>
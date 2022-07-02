<template>
<div>
    <div class="cell-select">
        <span class="cell-select-title">切换小区</span>
        <n-space vertical>
            <n-select v-model="cellValue" :options="cellData" :on-update:value="setCellMessage" />
        </n-space>
    </div>
    <div id="container"></div>
</div>

</template>

<script setup>
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { shallowRef, onMounted, onBeforeMount, ref, h, render } from 'vue'
    import axios from 'axios';
    import { useMessage, useDialog, NInput } from 'naive-ui';

    const cellName = ref('')
    const message = useDialog();
    const dialog = useDialog();
    const cellData = ref([])
    const cellValue = ref([])
    const map = shallowRef(null)
    const aaMap = ref(null);
    const options=[
        {label:'2',value:'2'},
        {label:'1',value:'1'},
    ]

    let polygon,markers=[]
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
    function showInfoClick(e){
        console.log( '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置点击了地图！')
        console.log('message about click:',e)
    }

    onBeforeMount(()=>{
        // 获取小区数据
        cellInfo()
    })
    function cellInfo(){
        axios.get('/zhang/cmsuser/community/listAllCommunity',{
            headers: {
                'Authorization': localStorage.getItem('authorization')
            }
        }).then(
            res=>{
                console.log('res',res.data.data)
                for(let i=0;i<res.data.data.length;i++){
                    cellData.value.push({
                        label:res.data.data[i].communityName,
                        value:res.data.data[i].communityId
                        })
                }
            },
            err=>{
                console.log('err',err)
            }
        )
    }
    
    function setCellMessage(e){
        console.log(e)
        console.log('清楚残留的覆盖物')
        try{
            console.log(markers)
            for(let i=0;i<markers.length;i++){
                map.value.remove(markers[i])
            }
            map.value.remove(polygon)
        }catch{
            console.log('没有覆盖物')
        }

        let token = localStorage.getItem('authorization')
        console.log(token)

        let imageUrl = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
        let icon = new aaMap.value.Icon({
            size: new aaMap.value.Size(40, 40),
            image: imageUrl,
            imageSize: new aaMap.value.Size(40, 40),
        });
        // return
        // 获取小区数据
        axios.get(`/zhang/cmsuser/community/getCommunity?communityId=${e}`,{
            headers: {
                'Authorization': token
            }
        }).then(
            res=>{
                console.log('获取小区信息',res.data)
                // 调整地图中心
                map.value.setCenter(eval(res.data.data.communityLnglat))
                // 调整地图缩放
                map.value.setZoom(19)
                map.value.setFitView()
                // 绘制多边形
                let pathPoints = eval(res.data.data.communitySpace)
                console.log(pathPoints)
                pathPoints.push(pathPoints[0])
                console.log('pathPoints',pathPoints)
                polygon = new aaMap.value.Polygon({
                    path: pathPoints,
                    strokeColor: '#FF33FF',
                    strokeOpacity: 1,
                    strokeWeight: 3,
                    fillColor: '#1791fc',
                    fillOpacity: 0.35
                }); 

                map.value.add(polygon)

                // 监听点击事件
                polygon.on('click',function(e){
                    let currentPoint = [e.lnglat.getLng(),e.lnglat.getLat()]
                    
                    // 绘制出一个点
                    let marker = new aaMap.value.Marker({
                        position: currentPoint,
                        offset: new aaMap.value.Pixel(-12, -12),
                        icon: icon,
                    });
                    map.value.add(marker);

                    // 弹出信息窗体，是否确定改点
                    dialog.success({
                        title: '提示',
                        content:()=>{
                            return h(
                                NInput,
                                {
                                    onInput:(e)=>{
                                        cellName.value = e
                                        console.log(cellName.value)
                                    },
                                    placeholder:"请输入楼栋名称",
                                }

                            )
                        },
                        positiveText: '确定',
                        negativeText: '取消',
                        onPositiveClick:()=>{
                            // 发送数据
                            axios.post('/zhang/cmsuser/building/addBuilding'
                            ,{
                                buildingList:[
                                    {
                                        buildingName:cellName.value,
                                        buildingLnglat:'['+currentPoint+']'
                                    }
                                ],
                                userId:"2"
                            },
                            {
                                headers: {
                                    'Authorization': token
                                }
                            }
                            )
                            // 移除原来的点，然后重新绘制
                            map.value.remove(marker)
                            let labelContent = "<div class='label'>"+cellName.value+"</div>"
                            marker = new aaMap.value.Marker({
                                position: currentPoint,
                                icon: icon,
                                offset: new aaMap.value.Pixel(-20, -20),
                                label:{
                                    content:labelContent,
                                    offset:new aaMap.value.Pixel(0,0),
                                    direction:'right',
                                }
                                })
                            markers.push(marker)
                            map.value.add(marker)
                            console.log('关闭对话框')
                        },
                        onNegativeClick:()=>{
                            console.log('关闭对话框')
                            map.value.remove(marker)
                        }
                    })
                })

            },
            err=>{
                console.log('err',err)
            }

        )

        // 获取小区楼栋
        axios.get(`/zhang/cmsuser/building/viewBuilding?communityId=${e}`,{
            headers: {
                'Authorization': token
            }
        }).then(
            res=>{
                console.log('获取小区的楼栋',res.data)
                // 先将原有的点画出来
                let temp = res.data.data
                for (let i = 0; i < temp.length; i++) {
                    // 创建icon
                    let labelContent = "<div class='label'>"+temp[i].buildingName+"</div>"
                    
                    // 创建marker
                    let marker = new aaMap.value.Marker({
                        position: eval(temp[i].buildingLnglat),
                        icon: icon,
                        offset: new aaMap.value.Pixel(-20, -20),
                        label: {
                            content: labelContent,
                            offset: new AMap.Pixel(0, 0),
                            direction: 'right'
                        }
                    })
                    markers.push(marker)
                }
                    console.log('markers',markers)
                    // 添加marker
                    for(let i=0;i<markers.length;i++){
                        map.value.add(markers[i])
                    }
            },
            err=>{
                console.log(err)
            }
        )
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
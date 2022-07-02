<!-- <template>
<div>
    <div>123</div>
    <div id="container"></div> 
</div>
</template> -->

<!-- <script setup>
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { shallowRef, onMounted, ref } from 'vue'

    const map = shallowRef(null)
    let path = ref([
        [ 116.029292,28.679736 ],//唯义楼
        [ 116.032087,28.68138 ], //图书馆
        [ 116.024465,28.683188 ] ,// 小杏岭
    ])

    // var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

    onMounted(() => {
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
            console.log('map is :',map)
            map.value = new AMap.Map("container",{
                rotateEnable:true,
                pitchEnable:true,
                rotation:-45,
                viewMode:"3D",
                pitch:1,
                zoom:17,
                zooms:[2,22],
                center:[116.033474,28.680412],
            });
            
                // let polygon = new AMap.Polygon({
                //     path: path.value,
                //     strokeColor: '#00A',
                //     strokeWeight: 3,
                //     strokeOpacity: 0.8
                // });

                // map.value.add(polygon);

            // let icon = [];
            // let marker = []; 
            // for(let i=0; i<lnglats.length; i++){

            //     // 创建一个Icon
            //     let labelContent = "<div class='labelContetn'>JXNU unversity</div>"
            //     var imageUrl = 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
            //     icon[i] = new AMap.Icon({
            //         size: new AMap.Size(46, 28),
            //         image: imageUrl,
            //         imageSize: new AMap.Size(46, 28),
            //     });

            //     // 将Icon传入marker
            //     var labelOffset = new AMap.Pixel(0, 0);
            //     marker[i] = new AMap.Marker({
            //         position: lnglats[i],
            //         icon: icon[i],
            //         offset: new AMap.Pixel(0,0),
            //         label: {
            //             direction:"top",
            //             content:labelContent,
            //             offset: labelOffset,
            //         }
            //     });
            //     marker[i].on('click',(e)=>{
            //         console.log(e.lnglat.lng,e.lnglat.lat)
            //     })
            //     map.value.add(marker[i])

            // }
            
            // 地图缩放到合适的视野
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
    

</script> -->
<!-- 
<style lang="scss" scoped>
.controlArea{
    position: absolute;
    top: 0;
    left: 0;
}

</style> -->



<template>
<div>
    <div class="controlArea">

        <n-button @click="setCellMessage" type="primary">我选好了</n-button>"
        <n-button @click="clearMarker" type="primary">重新绘制</n-button>
    </div>
    <n-modal v-model:show="showModal">
        <div class="modal-contain">
            <n-form-item label="小区名称">
                <n-input v-model:value="formData.name" placeholder="请输入小区名称"></n-input>
            </n-form-item>
            <n-form-item label="小区详细地址">
                <n-input v-model:value="formData.address" placeholder="请输入小区详细地址"></n-input>
            </n-form-item>
            <div style="text-align:center;margin-bottom: 5px;">
                <n-button type="primary" @click="submitForm">点击提交</n-button>
            </div>
        </div>
    </n-modal>

    <div id="container"></div>

</div>

</template>

<script setup>
    import AMapLoader from '@amap/amap-jsapi-loader';
    import { shallowRef, onMounted, ref, reactive } from 'vue'
    import { useMessage } from 'naive-ui'
    import axios from 'axios';
import { largerSize } from 'naive-ui/lib/_utils';

    
    const formData = reactive({
        name:'',
        address:'',
    })
    const showModal = ref(false)
    const map = shallowRef(null)
    let polygon
    var lnglats = ref([
        // [ 116.029292,28.679736 ],//唯义楼
        // [ 116.032087,28.68138 ], //图书馆
        // [ 116.024465,28.683188 ] ,// 小杏岭
    ]);

    onMounted(() => {
        const message = useMessage()
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

           
            polygon = new AMap.Polygon({
                path: lnglats.value,
                strokeColor: '#00A',
                strokeWeight: 3,
                strokeOpacity: 0.8
            });
            map.value.add(polygon);
            

            map.value.setFitView();

            // add map event listener
            map.value.on('click', (e)=>{
                console.log( '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置点击了地图！')
                // 清除多边形并重新绘制
                map.value.remove(polygon)


                lnglats.value.push([e.lnglat.getLng(),e.lnglat.getLat()])
                console.log('lnglats:',lnglats.value,[e.lnglat.getLng(),e.lnglat.getLat()])

                polygon = new AMap.Polygon({
                    path: lnglats.value,
                    strokeColor: '#00A',
                    strokeWeight: 3,
                    strokeOpacity: 0.8
                });
                map.value.add(polygon);
                console.log('绘制之后',lnglats.value)
            })
          

        }).catch(e => {
            console.log(e);
        })

        message.info("点击地图，绘制多边形,选择小区",
            {duration:5e3,closable:true,'placement':"top-left"}
        )
    })
    function clearMarker(e){
        map.value.remove(polygon)
        lnglats.value = []

    }
    
    function setCellMessage(e){
        console.log('set cell message')
        showModal.value = true
        let token = localStorage.getItem('ACCESS_TOKEN')
        console.log(JSON.parse(token).value)
    }
    function submitForm(e){
        console.log('创建新的小区')
        // 先查找所有小区
        let cellIndex = 0
        let token = localStorage.getItem('authorization')
        console.log(token)
        // return 
        axios.get('/zhang/cmsuser/community/listAllCommunity',{
            headers:{
                'Authorization': token
                }
        }).then(res => {
            console.log('所有小区',res)
            cellIndex = res.data.data.length


            // console.log(formData)
            const space = ()=>{
                let lnnglat=''
                for(let i=0;i<lnglats.value.length-1;i++){
                    console.log(lnglats.value[i])
                    lnnglat+='['+lnglats.value[i]+']'+','
                }
                lnnglat+='['+lnglats.value[lnglats.value.length-1]+']'
                console.log('['+lnnglat+']')
                return '['+lnnglat+']'
            }

            const comLngLat= ()=> {
                let a=0,b=0
                console.log('lnglats',lnglats.value)
                for(let i=0;i<lnglats.value.length;i++){
                    console.log(lnglats.value[i])
                    a+=lnglats.value[i][0]
                    b+=lnglats.value[i][1]
                }
                console.log(a,b)
                console.log('['+a/lnglats.value.length+','+b/lnglats.value.length+']')
                return '['+[a/lnglats.value.length,b/lnglats.value.length]+']'
            }
            // comLngLat()
            // space()
            // return
            axios.post('/zhang/cmsuser/community/addCommunity',{
                communityAddress:formData.address,
                communitySpace: space(), 
                communityLnglat:comLngLat(),
                communityName:formData.name,
                communityIndex: cellIndex,
            },{
                headers:{
                    'Authorization':token
                }
            }).then(res => {
                console.log(res)
                showModal.value = false
            }).catch(e => {
                console.log('异常',e)
            })

        }).catch(e => {
            console.log('e:',e)
        })

    }
</script>

<style scoped lang="scss">
    #container{
        padding:0;
        margin:0;
        width:100%;
        height:100%;
    }
    .controlArea{
        position: absolute;
        bottom: 2rem;
        text-align: center;
        right: calc(55% - 100px);
        width: 200px;
        z-index: 10;
        background-color: rgba(107, 121, 142, 0.6);
    }
    .modal-contain{
        background-color: aliceblue;
        width: 40%;
        height: 40%;
        padding-top: 10px;
    }
</style>
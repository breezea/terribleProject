
            // info window
            // infowindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            // for(let i=0, marker;i<lnglats.length;i++){
            //     marker = new AMap.Marker({
            //         position: lnglats[i],
            //         map: map.value,
            //         icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            //         offset: new AMap.Pixel(-12, -36),
            //         title: "点击查看详情"
            //     });
            //     marker.content = `I'm the ${i} marker`;
            //     marker.on('click', ()=>{
            //         infowindow.setContent(marker.content);
            //         infowindow.open(map.value, marker.getPosition());
            //     });
            //     marker.emit('click', {target: marker})
                
            // }
            // map.value.setFitView();


function showInfoClick(e){
        console.log( '您在 [ '+e.lnglat.getLng()+','+e.lnglat.getLat()+' ] 的位置点击了地图！')
        console.log('message about click:',e)
    }
    

    
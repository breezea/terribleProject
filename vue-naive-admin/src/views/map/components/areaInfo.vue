<template>
    <div class="mapInfo">

            <n-data-table
                :columns="columns"
                :data="data"
            >

            </n-data-table>

    </div>

</template>

<script setup>
    import { ref, isRef } from 'vue'
    import {userAreaTable} from './mapTable.js'

    const {menuOptions, initMenus, columns, data} = userAreaTable()
    console.log(menuOptions, initMenus, columns, data)

    console.log('123123123',isRef(columns))

    // const columns = ref([
    //     {
    //         title:"no",
    //         key:"no",
    //     },
    //     {
    //         title:"name",
    //         key:"name",
    //     }
    // ])

    // const data = [
    //     {
    //         no:1,name:"北京",
    //     },

    // ]

</script>

<style lang="scss" >
</style>
<template>
  <router-view></router-view>
</template>

<script>
import * as echarts from 'echarts'
import { provide } from 'vue'
export default{
  name:"App",
  components:{
  },
  setup(){
    provide('echarts',echarts)
  },
  data(){

    }
}
</script>

<style>
::-webkit-scrollbar {

  background-color: #d9d9d9;

}
::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background-color: #b9b9b9;
}
</style>

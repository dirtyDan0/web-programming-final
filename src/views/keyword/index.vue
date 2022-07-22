<template>
    <headerPadding/>
    

    <p class="title_1">"{{keyword}}"的热度</p>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
    <p class="title_1">"{{keyword}}"同样出现在</p>
    
    <div v-for="item in more_news" @click="this.$router.push({path:'/newsDetail',query: {id:item.id_fetches}})">
      <p class="brief_news">{{item.title}}</p>
    </div>
    

</template>

<script>
import * as echarts from "echarts";
import headerPadding from '../../components/header-padding'
import axios from "axios"
import title_1 from "../Main"

export default {
    
  data() {
    return {
    keyword:null,
      xData: [], //横坐标
      yData: [], //数据
      myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式,
      rawData:null,
      more_news:null
    };
  },
  created(){
    this.keyword = this.$route.query.keyword;
    var _this = this
        axios({
          method:'get',
            url:'http://localhost:8082/search',
            params:{
              text:_this.keyword
            }
        })
        .then(function(response){
          _this.more_news = JSON.parse(JSON.stringify(response.data));
          console.log(_this.news);//请求正确时执行的代码
        }).catch(function (err){
            console.log(err);//发生错误时执行的代码
        })
  },
  mounted() {
    var _this = this;
    const origin_option = {
      xAxis: {type: 'category'},
      yAxis: {type: 'value',minInterval: 1},
      dataZoom: [{}],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          label: {
            show: true,
            position: 'top',
            fontWeight:'bold'
          },
        }
      ],      
    };
    let myChart = echarts.init(document.getElementById("mychart"));
    myChart.setOption(origin_option);
      //随着屏幕大小调节图表
    window.addEventListener("resize", () => {
      myChart.resize();
    });
    
    axios({
      method:'get',
      url:'http://localhost:8082/keyword',
      params:{
        keyword:_this.keyword
      }
    })
    .then(function(response){
      _this.rawData = JSON.parse(JSON.stringify(response.data));
                    
    for(let i in _this.rawData){
      _this.xData.push(_this.rawData[i].date.substring(0,10));
      _this.yData.push(_this.rawData[i].countNum);      }

    console.log(_this.xData)
    myChart.setOption({
        xAxis: {
          data: _this.xData
        },
        series: [
        {
          data: _this.yData
        }
      ]
      });

    }).catch(function (err){
      console.log(err);
    })
  },
  methods: {
  
  },
  components:{
    headerPadding
  }
};
</script>



<style>


</style>

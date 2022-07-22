<template>
  <headerPadding/>
  <div style="margin-top:20px; display:flex;justify-content:center;">
    <input v-model="text" class="input_bar" placeholder="输入后回车以搜索" @keyup.enter="search()" @input="clear();search()">    
  </div>

    <el-radio-group style="margin-left:40px;margin-top:20px;display:flex;justify-content:center;" v-model="selected" size="large">
      <el-radio-button label="搜寻内容" />
        <el-radio-button label="搜寻标题" />
        <el-radio-button label="搜寻关键词热度" />
    </el-radio-group>    

  <div v-if="text && news && if_keyword()==false" >
    <p style="font-weight: bold;font-size:30px; ">查询结果</p>
    <table align="center" width="100%;margin-left:0" class="table xunw_table_form" border="0">
      <tbody>
        <tr>
          <th  class="zxstyle" style="width:10%">来源</th>
          <th  class="zxstyle" style="width:55%">标题</th>
          <th  class="zxstyle" style="width:20%">作者</th>
          <th  class="zxstyle" style="width:15%">日期</th>
        </tr>
        <tr class="data_row" v-for="(item, index) in news" :key="item.id" @click="this.$router.push({path:'/newsDetail',query: {id:item.id_fetches}})">
          <td>{{item.source_name}}</td>
          <td>{{item.title}}</td>
          <td>{{item.author}}</td>
          <td>{{item.publish_date.substring(0,10)}}</td>                           
        </tr>
      </tbody>
    </table>
  </div>    
  <div v-if="!text">
    <p class="big_notice">请输入。</p>
  </div>
  <div v-if="news.length==0">
    <p class="big_notice">空空如也。</p>
  </div>
  <div v-if="text&&!news">
    <p class="big_notice">查询中。。。</p>
  </div>
</template>

<style scoped>


.big_notice{
  font-size:100px;
  text-align:center;
  font-weight:bolder
}
.data_row:hover{
  transition: all .3s;
  background-color: black;
  color: white;
  cursor:pointer
}

.zxstyle{
  text-align: left;
  font-weight: bold;
  width:25%;
}
.ly {
  text-align: center;
  font-size: 25px;
  color: #00a7d0;
}
.table>tbody>tr>td {
  vertical-align: middle;
}

.input_bar{
  margin: auto;
  width: 60%;
  height: 40px;
  border-radius: 20px;
  padding-left: 20px;
  background-color: rgb(255, 255, 255);
  border: 2px solid;
}

.choice{
  height:40px;
  margin-left: 20px;
  width:90px;
  border-radius: 20px;
  border: 2px solid;
  padding-left: 10px;
}

  .option{
    text-align:center;
    font-size: large;
  }

</style>


<script>
  import * as echarts from 'echarts'
  import headerPadding from '../../components/header-padding'
  import axios from "axios"

  export default{
    name:'search',
    data(){
    return {
          selected:null,
          text:"",
          news:false,
          keywordData:null,
         }
    },
      
    components:{
      headerPadding,
    },
    mounted() {
          
    },
    methods:{
      clear(){
        this.news = false;
      },
      search(){
        if(this.if_keyword()==true){
          this.$router.push({path:'/keyword',query: {keyword:this.text}})
          return;
        }

        if(this.text!=""){
          //alert("请输入内容");
          var _this = this
        axios({
          method:'get',
            url:'http://localhost:8082/search',
            params:{
              selected:_this.selected,
              text:_this.text
            }
        })
        .then(function(response){
          _this.news = JSON.parse(JSON.stringify(response.data));
          console.log(_this.news);//请求正确时执行的代码
        }).catch(function (err){
            console.log("ttt");//发生错误时执行的代码
        })
      }

      },
      if_keyword(){
        console.log(this.selected)
        if(this.selected=="搜寻关键词热度")
          return true
        return false
      },
        
      }
    }
</script>
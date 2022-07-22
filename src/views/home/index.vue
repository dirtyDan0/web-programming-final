<template>
    <headerPadding/>  
    <div style="height:200px;width:100%;">
        <div style="display:flex;position: relative;width:100%;">
            <div class="title1">新闻速览</div>
            <el-icon @click="get_home_news()" color="white" class="refresh"><RefreshRight /></el-icon>
        </div>
        
        <div v-for="item in home_news" @click="this.$router.push({path:'/newsDetail',query: {id:item.id_fetches}})">
            <p class="brief_news">{{item.title}}</p>
        </div>
         
    </div>  

</template>

<script type="ts">
    import headerPadding from '../../components/header-padding'
    import axios from "axios"
    import brief_news from "../Main"
   
    export default{
        name:'home',
        data(){
            return {
                home_news:[]
            }
        },
        components:{
            headerPadding,
        },
        created(){   
            this.get_home_news();
        },
        methods:{
            get_home_news(){
                var _this = this
                axios.get('http://localhost:8082/home_news').then(function(response){
                    _this.home_news = JSON.parse(JSON.stringify(response.data));

                    //console.log(_this.home_news[1].title);//请求正确时执行的代码
                }).catch(function (response){
                    console.log(response);
                });
            }
        }
    }
</script>

<style scoped>

html,body{
    display: flex;
}

.refresh{
background-color: white;padding: 8px;border-radius: 100%;
color: black;border: 2px solid;
  -webkit-app-region: no-drag;
  margin-top:35px;
  margin-left:20px
}
.refresh:hover{
  background-color: black;
  border: 2px solid;
  color: white;
  transition: .3s;
  cursor:pointer
}
.title1{
    margin-top:30px;
    font-weight: bold;
    font-size:30px; 
}
.displayAllButton{
    font-weight: bold;
    font-size:15px; 
    position: absolute;
    top: 40%;
    right: 0%;
}
.displayAllButton:hover {
	text-decoration: underline;
  cursor:pointer
}


</style>
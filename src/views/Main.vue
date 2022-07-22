<template >

    <el-container class="common-layout">

        <div style="margin:0;width:185px;box-shadow:inset  0 0 0.5px;">
          <p style="width:220px;height:10px"></p>
          <el-menu
          active-text-color=black
          text-color= rgb(141,141,141)       
          background-color=none
          default-active="1"          
          >
            <el-menu-item index="1" @click="this.$router.push('/home')">
              <el-icon :size="40"><HomeFilled /></el-icon>
              <span>新闻速览</span>
            </el-menu-item>

            <el-menu-item index="2" @click="this.$router.push('/search')">
              <el-icon :size="40"><Search /></el-icon>
              <span>搜寻</span>
            </el-menu-item>

          </el-menu>
          <el-divider />
        </div>
        
        <el-container>
          <el-header >
            <el-icon @click="this.$router.go(-1)" color="white" class="routerIcon"><ArrowLeftBold /></el-icon>
            <el-icon @click="this.$router.go(1)" color="white" class="routerIcon"><ArrowRightBold /></el-icon>            
            <div style="position:fixed;right:0px;top:0px;z-index: 3;
            display: flex;">
              <p  class="right-top-btn" @click="minimizeWin()">—</p>
              <p  class="right-top-btn" @click="maximizeWin()">▢</p>
              <p  class="right-top-btn" @click="closeWin()">✕</p>
            </div>

          </el-header>

          <el-main>
            <router-view></router-view>
          </el-main>
          
        </el-container>
    </el-container>
  
</template>




<script>
import { ipcRenderer} from 'electron';

export default {
  
  name:"Home",
  data(){
    return{
          color_set:[
          "linear-gradient(344deg, rgba(255,255,255,0) 42%, rgba(199,251,240,1) 76%, rgba(169,249,214,0.7773610176492471) 100%)",
          "linear-gradient(344deg, rgba(255,255,255,0) 38%, rgba(247,214,250,0) 76%, rgba(255,189,248,0.7773610176492471) 100%)",
          "linear-gradient(344deg, rgba(255,255,255,0) 38%, rgba(255,240,230,0) 76%, rgba(255,189,189,0.7773610176492471) 100%)",
          "linear-gradient(344deg, rgba(255,255,255,1) 25%, rgba(230,255,253,0) 62%, rgba(107,240,255,0.14710891680891103) 100%)"

              ]
    }
  },
  methods:{
     minimizeWin(){
       ipcRenderer.send('window-min') 
    },
    maximizeWin(){
      ipcRenderer.send('window-max')
    },
    closeWin(){
      ipcRenderer.send('window-close')
    }
    
  }
}
</script>

<style>
@keyframes show_up{
  0%{opacity: 0;}
  100%{opacity: 1;}
}
*{
  animation: show_up 0.2s;
}
html,body{
  user-select: none;
  margin:0;
  padding:0;
  overflow-x:hidden;
  display:inline !important;
  
  }

.el-container{
  width:100%
}
.common-layout{
  height:100vh;
  width:100%;
}

.common-layout .el-aside{
  //background-color:rgb(255, 255, 255);
  
  
}

.el-main{
  width:100%
}

.el-menu{
  border:0;
}

.el-menu-item{
  font-weight:bold;
  font-size:15px;
  height: 100px;

}

.el-menu-item:hover{
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0) !important;
  outline: 0 !important;  
  transition: transform 0.5s;
}


.el-header{
  -webkit-app-region: drag;
  background-color: rgba(255, 255, 255, 0.76);
  position: fixed;
  width:100%;
  padding-top:15px;
  height:60px;
  z-index: 2;
  border-bottom-style:dotted solid;
}
.routerIcon{
margin-right: 30px;margin-top: 0px;background-color: white;padding: 8px;border-radius: 100%;
color: black;border: 2px solid;
  -webkit-app-region: no-drag;
}
.routerIcon:hover{
  background-color: black;
  border: 2px solid;
  color: white;
  transition: .3s;
  cursor:pointer
}

.right-top-btn{
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-top: 0;
  background-color: rgb(255, 255, 255);
  -webkit-app-region: no-drag;
  cursor:pointer
  
}

.right-top-btn:hover{
  background-color: rgb(223, 223, 223);
  
}

.right-top-btn:last-child:hover{
  background-color: rgb(184, 0, 0);
  color: white;
  
}

.brief_news{
    font-size: large;
    opacity: 0.7;
    font-weight:600;
}

.brief_news:hover{
    opacity: 1;
    color:white;
    font-weight: bolder;
	transition: all .3s;
    font-size:20px;
    cursor:pointer;
    background-color: rgb(80, 83, 83);
}

.title_1{
  font-size: 30px;
  font-weight: bold;
  margin-left: 0;
}

</style>
"use strict";(global["webpackChunkvue_manage"]=global["webpackChunkvue_manage"]||[]).push([[758],{9758:(t,e,a)=>{a.r(e),a.d(e,{default:()=>g});var o=a(3396),r=a(7139);const s={class:"title_1"},n={class:"title_1"},l=["onClick"],i={class:"brief_news"};function c(t,e,a,c,d,h){const u=(0,o.up)("headerPadding");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(u),(0,o._)("p",s,'"'+(0,r.zw)(d.keyword)+'"的热度',1),(0,o._)("div",{class:"echart",id:"mychart",style:(0,r.j5)(d.myChartStyle)},null,4),(0,o._)("p",n,'"'+(0,r.zw)(d.keyword)+'"同样出现在',1),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.more_news,(t=>((0,o.wg)(),(0,o.iD)("div",{onClick:e=>this.$router.push({path:"/newsDetail",query:{id:t.id_fetches}})},[(0,o._)("p",i,(0,r.zw)(t.title),1)],8,l)))),256))],64)}var d=a(8548),h=a(558),u=a(6265),w=a.n(u);a(67);const f={data(){return{keyword:null,xData:[],yData:[],myChartStyle:{float:"left",width:"100%",height:"400px"},rawData:null,more_news:null}},created(){this.keyword=this.$route.query.keyword;var t=this;w()({method:"get",url:"http://localhost:8082/search",params:{text:t.keyword}}).then((function(e){t.more_news=JSON.parse(JSON.stringify(e.data)),console.log(t.news)})).catch((function(t){console.log(t)}))},mounted(){var t=this;const e={xAxis:{type:"category",axisLabel:{interval:0}},yAxis:{type:"value",minInterval:1},series:[{type:"bar",showBackground:!0,itemStyle:{color:new d.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#83bff6"},{offset:.5,color:"#188df0"},{offset:1,color:"#188df0"}])},emphasis:{itemStyle:{color:new d.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#2378f7"},{offset:.7,color:"#2378f7"},{offset:1,color:"#83bff6"}])}},label:{show:!0,position:"top"}}]};let a=d.init(document.getElementById("mychart"));a.setOption(e),window.addEventListener("resize",(()=>{a.resize()})),w()({method:"get",url:"http://localhost:8082/keyword",params:{keyword:t.keyword}}).then((function(e){t.rawData=JSON.parse(JSON.stringify(e.data));for(let a in t.rawData)t.xData.push(t.rawData[a].date.substring(0,10)),t.yData.push(t.rawData[a].countNum);console.log(t.xData),a.setOption({xAxis:{data:t.xData},series:[{data:t.yData}]})})).catch((function(t){console.log(t)}))},methods:{},components:{headerPadding:h.Z}};var y=a(89);const p=(0,y.Z)(f,[["render",c]]),g=p}}]);
//# sourceMappingURL=758.830e63ce.js.map
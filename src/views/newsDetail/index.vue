<template>
    <headerPadding/>
    <div>
        <div style="
background: linear-gradient(-5deg, rgba(255,255,255,0) 42%, rgba(199,251,240,1) 76%, rgba(169,249,214,0.7773610176492471) 100%);
">
            <p class="newsHeader">{{title}}</p>
            <p class="subTitle">作者：{{author}}</p>
            <p class="subTitle">来源：{{source}}</p>
            <p class="subTitle">{{releaseDate}}</p>

        </div>

        <div style="display:flex;">
            <div class="content">
                <p>{{content}}</p>
            </div>
            <div style="width: 30%;margin-left: 2%;">
                <div v-if="keyWords!=null" class="keyWordsDiv">
                    <p class="subTitle">关键词</p>
                    <p class="keyWords"  v-for="word in keyWords"  @click="this.$router.push({path:'/keyword',query: {keyword:word}})">{{word}}</p>
                    
                </div>
            </div>
        </div>
        
        
        
    </div>
</template>

<style>

.newsHeader{
    width: 100%;

    font-size: 40px;
    font-weight: bold;
    margin-bottom: 0px;
    padding-top: 90px;
    margin-top: 0;
}
.subTitle{
    width: 100%;
    font-size: 25px;
    font-weight: bold;
    margin-top: 10px;
}

.keyWordsDiv{
    width: 100%;
}
.keyWords{
    font-size: 20px;
    font-weight: bold;
    width: auto;
}
.keyWords:hover{
    color:white;
    font-weight: bolder;
	transition: all .3s;
    cursor:pointer;
    background-color: rgb(80, 83, 83);
}
.content{
    width: 70%;
    margin-right: 2%;
    margin-left: 2%;
    font-size: 20px;
    font-weight:500;
}
</style>

<script>
    import headerPadding from '../../components/header-padding'
    import axios from "axios"

    export default{
        name:'newsDetail',
        data(){
            return {
                id:'',
                title:'',
                author:'',
                source:'',
                releaseDate:'',
                keyWords:null,
                content:"",

            }
        },
        methods:{
            get_news_detail(id){
                var _this = this
                axios({
                    method:'get',
                    url:'http://localhost:8082/newsDetail',
                    params:{
                        id:id
                    }
                }
                ).then(function(response){
                    var home_news = JSON.parse(JSON.stringify(response.data))[0];
                    _this.title = home_news.title;
                    _this.author = home_news.author;
                    _this.source = home_news.source_name;
                    _this.releaseDate = home_news.publish_date.substring(0,10);
                    _this.content = home_news.content;
                    if(home_news.keywords==null){
                        _this.keyWords = null
                    }else{
                        _this.keyWords = home_news.keywords.split(',');

                    }
                    console.log(_this.keyWords);//请求正确时执行的代码
                }).catch(function (response){
                    console.log(response);//发生错误时执行的代码
                });
            }

        },
        created(){
            this.id = this.$route.query.id;
            console.log(this.id);
            this.get_news_detail(this.id);

        },
        components:{
            headerPadding
        }
    }
</script>

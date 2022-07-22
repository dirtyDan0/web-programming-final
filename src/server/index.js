var mysql = require('./mysql.js')
var express = require('express');
var app = express();


app.all('*', function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*')
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'content-type')
    //跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
    if (req.method.toLowerCase() == 'options') res.send(200)
    //让options尝试请求快速结束
    else next()
})



app.get('/home_news', function(request, response) {
    var fetchSql = "select id_fetches,source_name,title,publish_date " +
        "from fetches order by rand() limit 0,18";
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(result));
        response.end();
    });
});

app.get('/newsDetail', function(request, response) {
    var id = request.query.id;
    var fetchSql = "select id_fetches,source_name,title,publish_date,content,author,keywords  " +
        "from fetches where id_fetches ="+id;
    mysql.query(fetchSql, function(err, result, fields) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(result));
        response.end();
    });
});

app.get('/search', function(request, response) {
    //sql字符串和参数
    var selected = request.query.selected;
    var text = request.query.text;
    var type;
    var fetchSql
    if(selected=="搜寻内容")
    {
        fetchSql = "select id_fetches,source_name,title,publish_date,author  " +
        "from fetches where content like "+"\"%"+text+"%\"";
    }
    else if(selected=="搜寻标题"){
        fetchSql = "select id_fetches,source_name,title,publish_date,author  " +
        "from fetches where title like "+"\"%"+text+"%\"";
    }
    else{
        fetchSql = "select id_fetches,source_name,title,publish_date,author  " +
        "from fetches where title like "+"\"%"+text+"%\" or content like "+"\"%"+text+"%\"";
    }

    mysql.query(fetchSql, function(err, result, fields) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.write(JSON.stringify(result));
    response.end();
    });
});

app.get('/keyword', function(request, response) {
    var keyword = request.query.keyword;    
    var fetchSql = "select count(id_fetches) countNum, DATE(publish_date) date " +
        "from fetches where content like "+"\"%"+keyword+"%\" or title like "+"\"%"+keyword+"%\""
        +"GROUP BY DATE(publish_date) ORDER BY DATE(publish_date) ASC";
    try{
        mysql.query(fetchSql, function(err, result, fields) {
        console.log(result);
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(result));
        response.end();
        });
    }catch(e){
        console.log(e)
    }
});

var server = app.listen(8082, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("访问地址为 http://%s:%s", host, port)

})
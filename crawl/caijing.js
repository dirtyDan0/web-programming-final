// 新闻来源
let source_name = "财经网";
// 编码格式
let myEncoding = "utf-8";
// 主页URL
let seedURL = 'http://www.caijing.com.cn/';
let myURL = "";
// Jquery全局对象
let seedURL_format = "$('*')";

var mysql = require('./mysql.js')

// 导入所需模块
let fs = require('fs');    // 文件库, 最后的新闻对象存入JSON文件中
let myRequest = require('request'); // 对网站发出请求
let myCheerio = require('cheerio'); // 对请求得到的html代码进行解析为Jquery对象
let myIconv = require('iconv-lite');// 对网站进行uft8编码
let superagent = require('superagent'); // 根据url得到网站的html代码
require('date-utils');    // 日期操作

// 防止网站屏蔽我们的爬虫, 详细见下方headers
let headers = {
    'user-agent': "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36"
};

// request模块异步fetch url
function request(url, callback) {
    let options = {
        url: url,
        encoding: null,
        headers: headers,
        // 响应时间
        timeout: 10000
    }
    myRequest(options, callback);
}


request(seedURL, function(err, res, body) {
    // 回调函数 err为错误信息, 无错误则为null, res为回调函数得到的结果
    // 用iconv转换编码, 存入html中
    let html = myIconv.decode(body, myEncoding);
    // 对得到的html代码进行解析
    let $ = myCheerio.load(html, {decodeEntities: true});
    let seedurl_news;
    try {
        seedurl_news = eval(seedURL_format);
        //console.log(seedurl_news)
    } catch(e) {console.log('url列表所处的html模块识别出错' + e)};
    seedurl_news.each(function(i, e) {
        try {
            // 提取出网站的所有href链接并做判断, 无则跳过到下一次循环
            let href = "";
            href = $(e).attr("href");
            if (typeof href == "undefined") {
                return;
            }

            
            if (
                href.match(/caijing.com.cn\/[0-9]{8}\/[0-9]{7}\.shtml$/)
                
                ){
                    console.log(href);
                    var myURL = href;
                }
        }  catch (e) {console.log('识别种子页面中的新闻链接出错：' + e)}
        // 用正则表达式对链接进行筛选, 符合条件的, 即新闻页面, 则进行处理.

        

        var fetch_url_Sql = 'select url from fetches where url=?';
            var fetch_url_Sql_Params = [myURL];
            mysql.query(fetch_url_Sql, fetch_url_Sql_Params, function(qerr, vals, fields) {
                if (vals.length > 0) {
                    console.log('URL duplicate!');
                    return;
                } else if(myURL!=null){
                    newsGet(myURL);
                }
            });
        
        })
    });



function newsGet(myURL) {       // 读取新闻页面

    superagent.get(encodeURI(myURL)).end((err, res) => {
        // err中存储错误, res中为html代码
        if (err) {
            console.log("热点新闻抓取失败-${err}");
        } else {
            console.log("爬取新闻成功!");
            getHotNews(res, myURL);
        }
    })
}

// 提取html代码中所需信息存入fetch对象中并输出为json文件
function getHotNews(res, myURL) {
    let $ = myCheerio.load(res.text, { decodeEntities: true });
    // fetch为单条新闻对象. 详细见fetches解释
    let fetch = {};
    fetch.title = "";
    fetch.content = "";
    fetch.keywords = "";
    fetch.publish_date = "";
    fetch.author = "";
    fetch.desc = "";
    fetch.source_name = source_name;
    fetch.source_encoding = myEncoding;
    fetch.crawltime = new Date;
    fetch.url = myURL;

    fetch.title =  $('.article').children('h2').text();

    fetch.content = $(".article-content").eq(0).text().replace(/\s*/g,"");

    if($('meta[name=\"keywords\"]')!=null){
        fetch.keywords = $('meta[name=\"keywords\"]').eq(0).attr("content");
    }else{
        fetch.keywords = $('.news_keywords').children.text();
    }

    if($('.news_time')!=null){
        fetch.publish_date = $('.news_time').eq(0).text();
    }else{
        fetch.publish_date = $('span[id=\"pubtime_baidu\"]').text();
    }

    fetch.author = $('.editor').eq(0).text().replace(/\s*/g,"");

    fetch.desc = $('meta[name=\"description\"]').eq(0).attr("content");

    /*
    console.log("时间"+fetch.publish_date+" "+fetch.url);
    let filename = source_name + "_" + (new Date()).toFormat("YYYY-MM-DD") +
    "_" + myURL.slice(myURL.lastIndexOf('/') + 1, myURL.lastIndexOf('.')) +".json";
    // 输出为json文件
    fs.writeFileSync(filename, JSON.stringify(fetch));
    */

    
    var fetchAddSql = 'INSERT INTO fetches(url,source_name,source_encoding,title,' +
    'keywords,author,publish_date,crawltime,content) VALUES(?,?,?,?,?,?,?,?,?)';
    var fetchAddSql_Params = [fetch.url, fetch.source_name, fetch.source_encoding,
        fetch.title, fetch.keywords, fetch.author, fetch.publish_date,
        fetch.crawltime.toFormat("YYYY-MM-DD HH24:MI:SS"), fetch.content
    ];

    //执行sql，数据库中fetch表里的url属性是unique的，不会把重复的url内容写入数据库
    mysql.query(fetchAddSql, fetchAddSql_Params, function(qerr, vals, fields) {
        if (qerr) {
            //console.log(qerr);
            console.log("时间"+fetch.publish_date+" "+fetch.url);

        }
    }); //mysql写入*/
    
    
};
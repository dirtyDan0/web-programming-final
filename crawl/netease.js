// 新闻来源
let source_name = "网易新闻";
// 编码格式
let myEncoding = "utf-8";
// 主页URL
let seedURL = 'https://news.163.com/';
let myURL = "";
// Jquery全局对象
let seedURL_format = "$('*')";

var mysql = require('./mysql.js')

// 导入所需模块
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
                href.match(/^https:\/\/www.163.com\/news\/article\/.*?html$/)
                
                ){
                    var myURL = href;
                }
        }  catch (e) {console.log(e)}

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



function newsGet(myURL) {    

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

// 提取html代码中所需信息存入fetch对象中存入MySQL中
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

    fetch.title = $('.post_title').eq(0).text();
    if ($('head').children('title').text().indexOf("谈心社")!=-1) return;

    fetch.content = $(".post_body").eq(0).text().replace(/\s*/g,"");

    fetch.keywords = $('meta[name=\"keywords\"]').eq(0).attr("content");

    fetch.publish_date = $('html').eq(0).attr('data-publishtime');

    fetch.author = $('.post_author').eq(0).text().replace(/\s*/g,"");

    fetch.desc = $('meta[name=\"description\"]').eq(0).attr("content");

    var fetchAddSql = 'INSERT INTO fetches(url,source_name,source_encoding,title,' +
    'keywords,author,publish_date,crawltime,content) VALUES(?,?,?,?,?,?,?,?,?)';
    var fetchAddSql_Params = [fetch.url, fetch.source_name, fetch.source_encoding,
        fetch.title, fetch.keywords, fetch.author, fetch.publish_date,
        fetch.crawltime.toFormat("YYYY-MM-DD HH24:MI:SS"), fetch.content
    ];
    mysql.query(fetchAddSql, fetchAddSql_Params, function(qerr, vals, fields) {
        if (qerr) {
            console.log(qerr);
        }
    }); 
};
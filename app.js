var express = require('express')
var app = express()
var router = require("./router/router.js");
var db = require('./data/db.js')
var path = require('path')
var bodyparser = require('body-parser')
app.use(bodyparser.json({limit:'10mb'}));
app.use(bodyparser.urlencoded({limit:'10mb',extended:false}));
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json())
var session = require('express-session');
//跨域
var cors = require('cors');
app.use(cors());

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// app.use('node_modules',express.static('./node_modules'))
app.use(express.static('./public'))

app.set("view engine","ejs");

app.get("/",router.showIndex)
app.get("/index",router.showIndex);//显示首页
app.get("/about",router.showabout);
app.get("/information",router.showinformation);
app.get("/ticket",router.showticket);
app.get("/upregist",router.showregist)//显示注册页
app.get("/login",router.showlogin)//显示登录页
app.get("/admin",router.showadmin)//显示管理员管理页
app.get("/addData",router.showaddData)//显示增加餐饮数据页面
app.get("/fooddetail/:id",router.showFoodDetail)//显示本店详情
app.get("/edite/:id",router.showEdite)//显示编辑页面
app.get("/searchResult/:title",router.showsearchResult)//执行查询搜索并显示
app.get("/conditionResult/:location/:type/:lowPrice/:highPrice/:saleLowNum/:saleHighNum",router.showConditionResult)//显示条件筛选查询的结果
app.get("/exit",router.showexit)//退出系统
app.get("/showComment",router.showComment)//管理用户评论数据
app.get("/showUserPower",router.showUserPower)//管理用户评论数据
app.get("/showMoneyCount",router.showMoneyCount)


app.post("/doregist",router.doregist)//执行注册业务
app.post("/dologin",router.dologin)//执行登录业务
app.post("/doUploadimg",router.doUploadimg)//执行上传图片业务
app.post("/doaddData",router.doaddData)//执行添加餐饮数据业务
app.post("/doDelete",router.doDelete)//执行删除餐饮数据业务
app.post("/doUpdate",router.doUpdate)//执行餐饮数据更新
// app.post("/doConditionSearch",router.doConditionSearch)//执行条件筛选
app.post("/docomment",router.docomment)//处理用户评论业务
app.post("/doCommentDelete",router.doCommentDelete)//处理删除用户评论业务
app.post("/doChangePower",router.doChangePower)//处理修改用户权限

app.listen(8080)
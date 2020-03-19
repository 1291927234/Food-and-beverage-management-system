var express = require('express');
var Users = require('../data/user.js')
var md5 = require('../data/md5.js')
var eatplace = require('../data/eatplace.js');
var comment = require('../data/comment.js')
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs')
var formidable = require('formidable')


exports.showIndex = function(req,res,next){
    if(req.session.login !="1"){
        return res.redirect("/login")
    }
    eatplace.find({},function(err,result){
        res.render("index",{
            "Eatplaces":result
        })
    })
}

exports.showabout = function(req,res,next){
    if(req.session.login !="1"){
        return res.redirect("/login")
    }
    eatplace.find({"type":4},function(err,result){
        if(err){
            return res.send("-3")
        }
        // console.log(result)
        res.render("about",{"Eatplaces":result})
    })
}
exports.showinformation= function(req,res,next){
    if(req.session.login !="1"){
        return res.redirect("/login")
    }
    eatplace.find({"type":1},function(err,result){
        if(err){
            return res.send("-3")
        }
        // console.log(result)
        res.render("information",{"Eatplaces":result})
    })
}
exports.showticket = function(req,res,next){
    if(req.session.login !="1"){
        return res.redirect("/login")
    }
    eatplace.find({"type":2},function(err,result){
        if(err){
            return res.send("-3")
        }
        // console.log(result)
        res.render("ticket",{"Eatplaces":result})
    })
}
exports.showregist = function(req,res,next){
    res.render("regist",{})
}
exports.showlogin = function(req,res,next){
    res.render("login",{})
}
exports.showadmin = function(req,res,next){
    if(req.session.login !="1"){
        return res.redirect("/login")
    }
    eatplace.find({},function(err,result){
        if(err){
            console.log('服务器错误')
            return 
        }else{
            res.render("admin",{
                "Eatplaces":result
            })
        }
    })
}
exports.showsearchResult= function(req,res,next){
    var data = req.params.title
    eatplace.find({},function(err,result){
        if(err){
            return  res.send("-3")
        }
        else{
            var dataArr = []
            result.forEach(function(item,index){
            if(item.title.indexOf(data) !=-1 ){
                dataArr.push(item)
            }
        })
        console.log(dataArr)
        if (dataArr.length == 0 ){
              return res.send("-2")
         }
            res.render("searchResult",{"huoguo":dataArr})
            
        }   
    })
    
}
exports.showaddData = function(req,res,next){
    res.render("addData",{})
}
//显示管理评论页面
exports.showComment = function(req,res,next){
    eatplace.find({},function(err,result){
        if(err){
            return res.send("-3")
        }
        else{
            res.render("adminUserComment",{"Eatplaces":result})
        }
    })
    
}


//注册业务
exports.doregist = function(req,res,next){
    var userdata = req.body
    Users.findOne({username:userdata.user},function(err,result){
        if(err){
            return res.send("-3")//服务器错误
        }
        if(result){
            return res.send("-1")//用户名被占用
        }
        var password = md5(md5(userdata.password) + "upal");
        Users.create({
            "username":userdata.user,
            "password":password,
            "power":userdata.power
        },function(err,result){
            if(err){
                return res.send("-3")
            }
            else{
                req.session.login = "1"
                req.session.username = userdata.user
                return res.send("1")//注册成功
            }
        })
    })
}

exports.showFoodDetail = function(req,res,next){
    var data = req.params
    eatplace.find({"_id":data.id},function(err,result){
        if(err){
            return res.send("-3")//服务器错误，查询不到
        }
        else{
            res.render("fooddetail",{
                "Eatplaces":result
            })
        }
    })
    // res.render("fooddetail",{})
}

exports.showexit = function(req,res,next){
    req.session.login = "-1"
    req.session.username = ''
    return res.send('1')
}

exports.showMoneyCount = function(req,res,next){
    eatplace.find({},function(err,result){
        res.render("MoneyCount",{"Eatplaces":result})
    })
    
}

//登录业务
exports.dologin = function(req,res,next){
    var userdata = req.body
    var password = userdata.password
    var pwd = md5(md5(password) + "upal");
    Users.findOne({username:userdata.user},function(err,result){
        if(err|| !result){//result 是建立在能查询到的前提下
            return res.send("-1")//用户名不存在
        }
       else if(pwd== result.password &&userdata.power == result.power&&userdata.power==1 ){
            req.session.login = "1"
            req.session.username = userdata.user
            return res.send("1")
        }
        else if(pwd== result.password &&userdata.power == result.power&&userdata.power==0 ){
            req.session.login = "1"
            req.session.username = userdata.user
            return res.send("0")
        }
        else if(pwd== result.password &&result.power==-1){
            req.session.login = "-1"
            // req.session.username = userdata.user
            return res.send("-3")//黑名单用户，被封号
        }
        else{
            return res.send("-2")//密码或者权限错误
        }
    })
}

//执行上传图片业务
exports.doUploadimg = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/img/uploadimg/';
    form.maxFields = 5*1024*1024
    form.parse(req, function(err, fields, files) {
        if (files.modal_file) {
            var str = files.modal_file.name;
            var date = new Date();
            var newName = Math.round(date.getTime()*99+1) + str.substr(str.length-4);
            rename(files.modal_file.path, newName);
            function rename(old, _new, code, bId) {
                var path = 'public/img/uploadimg/';
                fs.exists(path, function(exists) {
                    if (!exists) { //创建文件夹
                        fs.mkdir(path)
                    }
                    fs.renameSync(old, path + _new, function(err) {
                        if (err) {
                            return;
                        }
                        console.log('上传成功!');
                        //return path;
                    })
                })
            }

            res.send({
                status:'success',
                src:newName
            })
        }
    })
}
//执行增加餐饮数据业务
exports.doaddData = function(req,res,next){
    var data = req.body
    eatplace.create({
        "type":data.type,
        "title":data.title,
        "salenum":data.salenum,
        "location":data.location,
        "details":data.details,
        "coverimg":data.coverimg,
        "coverimg1":data.coverimg1,
        "coverimg2":data.coverimg2,
        "spend":data.spend,
        "characteristic":data.characteristic,
        "img1description":data.img1description,
        "img2description":data.img2description
    },function(err,result){
        if(err){
            return res.send("-3")
        }else{
            res.send("1")//增加餐饮数据成功
        }
    })
}

//执行删除餐饮数据
exports.doDelete = function(req,res,next){
    var data = req.body
    eatplace.findByIdAndRemove(data._id,function(err,result){
        if(err){
            return res.send("-3")//服务器错误
        }
        else{
            return res.send("1")//删除成功
        }
    })
}
//执行编辑数据渲染到编辑表单
exports.showEdite = function(req,res,next){
    var data = req.params

    eatplace.find({"_id":data.id},function(err,result){
        if(err){
            return res.send("-3")
        }
        else{
             res.render("edite",{"Eatplaces":result})
        }
    })
}
exports.doUpdate = function(req,res,next){
    var data = req.body
    var id = data._id

    eatplace.update({"_id":id},{
        "type":data.type,
        "title":data.title,
        "salenum":data.salenum,
        "location":data.location,
        "details":data.details,
        "spend":data.spend,
        "coverimg":data.coverimg,
        "coverimg1":data.coverimg1,
        "coverimg2":data.coverimg2,
        "characteristic":data.characteristic,
        "img1description":data.img1description,
        "img2description":data.img2description
    },function(err,result){
        if(err){
            return res.send("-3")
        }
        else{
            return  res.send("1")
        }
    })
}
//执行条件筛选并显示
exports.showConditionResult= function(req,res,next){
    var data =req.params
    
    eatplace.find({},function(err,result){
        if(err){
            return res.send('-3')
        }
        else{
            if(data.lowPrice ==-1&&data.highPrice ==-1&&data.saleLowNum==-1&&data.saleHighNum==-1){//只输入了位置，种类,其他为空
                var dataArr = []
                result.forEach(function(item,index){
                    if(item.location.indexOf(data.location) !=-1&&item.type ==data.type){
                        dataArr.push(item)
                    }
                })
                if (dataArr.length == 0 ){
                      return res.send("-1")
                 }
                res.render("conditionResult",{"huoguo":dataArr})
                
            }
            else if(data.lowPrice !=-1&&data.highPrice !=-1&&data.saleLowNum==-1&&data.saleHighNum==-1){//输入位置和种类和价格
                var data1Arr = []
                result.forEach(function(item,index){
                    if(item.location.indexOf(data.location) !=-1&&item.spend>=data.lowPrice&&item.spend<=data.highPrice&&item.type ==data.type){
                        data1Arr.push(item)
                    }
                })
                if (data1Arr.length == 0 ){
                    return res.send("-1")
               }
                res.render("conditionResult",{"huoguo":data1Arr})
                
            }
            else if(data.lowPrice !=-1 &&data.highPrice !=-1&&data.saleLowNum!=-1&&data.saleHighNum!=-1){//全都输入
                var data2Arr = []
                result.forEach(function(item,index){
                    if(item.location.indexOf(data.location) !=-1&&item.spend>=data.lowPrice&&item.spend<=data.highPrice&&item.type ==data.type&&item.salenum>=data.saleLowNum&&item.salenum<=data.saleHighNum){
                        data2Arr.push(item)
                    }
                })
                if (data2Arr.length == 0 ){
                    return res.send("-1")
               }
                res.render("conditionResult",{"huoguo":data2Arr})
                
            }
            else{
                return res.send("-2")//亲亲，请完善好数据呢
            }
        }
       
    })
}
//把评论数据写入子数据表
exports.docomment = function(req,res,next){
    var data = req.body
    // console.log(data)
    var id =data.id
    var commentObj = {
        // "parent":id,
        "content":data.content,
        "username":data.username,
        "time":data.time,
    }
    Users.find({"username":data.username},function(err,result){
        if(err){
            return res.send("-3")
        }else{
            // console.log(result)
            // var pow = result[0].commentpower
            // console.log(pow)
            if(result[0].commentpower =='禁止评论'){
                return res.send("-4")//被限制评论
            }else{
                eatplace.update({"_id":id},{'$push':{"comments":commentObj}},function(err,result){//向子表中加数据，及其困难搞了半天
                    if(err){
                        return res.send("-3")
                    }else{
                        // console.log(result)
                        return res.send("1")//增加评论成功
                    }
                })
            }
        }
    })

}

exports.doCommentDelete = function(req,res,next){
    var data  = req.body
    // console.log(data)
    eatplace.updateOne({"comments._id":data._id},{'$pull':{"comments":{"_id":data._id}}},function(err,result){//删除数组中某一个评论***
        if(err){
            console.log(err)
            return res.send("-3")
        }
        else{
            return  res.send("1")//
            // console.log(result)
        }
    })
}

exports.showUserPower = function(req,res,next){
    Users.find({},function(err,result){
        if(err){
            return  res.send("-3")
        }
        else{
            res.render("adminUserPower",{"Users":result})
        }
    })
}

exports.doChangePower = function(req,res,next){
    var data = req.body
    console.log(data)
    Users.update({"username":data.username},{
        "power":data.power,
        "commentpower":data.commentpower
    },function(err,result){
        if(err){
            return res.send("-3")
        }
        else{
            res.send("1")
            console.log(result)
        }
    })
}

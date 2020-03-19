var mongoose = require('mongoose')
var Eatplaces = require('./eatplace.js')
mongoose.connect('mongodb://localhost/space');
var db = mongoose.connection;
db.once('open',function(callback){
    console.log("数据库成功打开")
})
module.exports = db

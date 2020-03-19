var mongoose = require('mongoose')
var commentsSchema =  new mongoose.Schema({
    username:String,
    content:String,
    power:Number,
    commentaim:String,
    time:String
});
var Comments = mongoose.model("Comments ",commentsSchema)
module.exports = Comments ;

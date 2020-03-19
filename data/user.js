var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    power:Number,
    username:String,
    password:String,
    commentpower:{
        type:String,
        default:"允许评论"
    }
})
var Users = mongoose.model('Users',userSchema)
module.exports = Users

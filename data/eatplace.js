var mongoose = require('mongoose')
var commentsSchema = new mongoose.Schema({
    username:String,
    content:String,
    power:{
        type:Number,
        default:1,
    },
    time:String,
    // parent:Number,
})
var eatplacesSchema =  new mongoose.Schema({
    title:String,
    salenum:Number,
    type:Number,//(1蛋糕奶茶，2自助餐，3火锅，4小吃快餐，5烧烤烤肉)
    location:String,
    details:String,
    spend:Number,
    characteristic:String,
    coverimg:String,
    coverimg1:String,
    coverimg2:String,
    img1description:String,
    img2description:String,
    comments:[commentsSchema]
});
var Eatplaces = mongoose.model("Eatplaces",eatplacesSchema)
module.exports = Eatplaces;
//

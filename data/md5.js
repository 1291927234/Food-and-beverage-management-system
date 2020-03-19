var crypto = require("crypto");
//创建一个不可逆的加密代码
module.exports = function(mingma){
    //创建并返回一个hash对象，它是一个指定算法的加密hash，用于生成hash摘要。
    var md5 = crypto.createHash('md5');
    var password = md5.update(mingma).digest('base64');
    return password;
}
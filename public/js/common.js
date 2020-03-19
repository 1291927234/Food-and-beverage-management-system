$(function(){
    //计算日期
    getDate = window.getDate = function(){
        var date = new Date();
        this.Y = date.getFullYear();
        this.M = date.getMonth()+1 ;
        this.D = date.getDate();
        this.H = date.getHours();
        this.minute = date.getMinutes();
        this.second = date.getSeconds();
        if(this.M < 10){
            this.M =  0 +"" + this.M;
        }
        if(this.D < 10){
            this.D =  0 +"" + this.D;
        }
        if(this.H < 10){
            this.H =  0 +"" + this.H;
        }
        if(this.minute < 10){
            this.minute =  0 +"" + this.minute;
        }
        if(this.second < 10){
            this.second=  0 +"" + this.second;
        }
        return this.Y + "-" + this.M + "-" + this.D+ " " + this.H+ ":" + this.minute+ ":" + this.second;
    }
    //设置 Cookie
    setCookie = window.setCookie = function(cname,cvalue,exdays){
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname+"="+cvalue+"; "+expires;
    }
    //获取 Cookie
    getCookie = window.getCookie = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    };
    //通用提示框
    Palert = window.Palert = function(inner){
       $("body").append("<div class=palert>"+ inner +"</div>");
        window.setTimeout(function(){
            $(".palert").remove();
        },1200);
    };

})
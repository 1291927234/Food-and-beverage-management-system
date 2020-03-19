$(function(){
    var admin = getCookie('username')
    console.log(admin)
    $('#admin').html('欢迎进行管理：'+admin)
    var _id = null;
    $("tbody").on('click','.delete',function(){
       var _id = $(this).parent().siblings('td').first().html()
       $.post("/dodelete",{
         "_id":_id
       },function(data){
         if(data ==1){
           alert("删除成功")
           window.location.href = "/admin"
           window.close();
         }
         else{
           alert("删除失败")
         }
       })
    })
  $("#exit").on('click',function(){
         $.get('/exit',function(data){
             if(data == 1){
                 window.location.href = '/login'
             }else{
                 alert('退出系统失败')
             }
              console.log(data)
         })
     })
    $("tbody").on('click','.edite',function(){
      var _id = $(this).parent().siblings('td').first().html()
      console.log(_id)
      $.get('/Edite/'+_id,function(data){
        if(data == -3){
          alert('服务器错误')
        }else{
          console.log("成功")
          window.location.href = "/edite/"+_id
        }
      })

    })
  })
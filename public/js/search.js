$(function(){
   $("#btn").on('click',function(){
    var value = $("#search").val()
    $.post("/search",{"title":value},function(data){
        console.log(data)
    })
   }) 
})
$(function(){   
    // var type = $("#type").val()
        $("#btn").on ('click',function(){
            var id = $("#_id").val()
            var type = $("#type").val()
            var title = $("#title").val()
            var salenum = $("#salenum").val()
            var location = $("#location").val()
            var details = $("#details").val()
            var coverimg = $("#coverimg").attr("src")
            var coverimg1 = $("#coverimg1").attr("src")
            var coverimg2 = $("#coverimg2").attr("src")
            var img1description = $("#img1description").val()
            var img2description = $("#img2description").val()
            var spend = $("#spend").val()
            var characteristic = $("#characteristic").val()
        $.post("/doUpdate",{
            "_id":id,
            "type":type,
            "title":title,
            "salenum":salenum,
            "location":location,
            "details":details,
            "spend":spend,
            "characteristic":characteristic,
            "coverimg":coverimg,
            "coverimg1":coverimg1,
            "coverimg2":coverimg2,
            "img1description":img1description,
            "img2description":img2description
        },function(data){
            if(data == 1){
                alert("修改当前餐饮数据成功，将在2秒中后跳转管理界面")
                setTimeout(function(){
                    window.location.href = '/admin'
                    window.close();
                },2000)
            }else{
                alert("服务器错误")
            }
        })
    })

    var coverimg = $("#coverimg");
            $("#file_a").on("click", function(){
                $('#file_button').click();
            })
            $('#file_button').change(function(e) {
                // var oldSrc = coverimg.attr('src');
                var _files = this.files[0];
                var r = new FileReader();
                r.readAsDataURL(_files);
                $(r).load(function() {
                    coverimg.attr('src',this.result);
                    var data = new FormData();
                    var ect = (_files).name.split('.')[1];
                    data.append("modal_file", _files);
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: "/doUploadimg",
                        data: data,
                        contentType: false,
                        processData: false
                    }).done(function(data, status) {
                        console.log('上传成功');
                        coverimg.attr('src',"/img/uploadimg/"+data.src);  
                    }).fail(function(err) {
                        console.log('上传失败');
                    })
                })
            })
            var coverimg1 = $("#coverimg1");
            $("#file_a").on("click", function(){
                $('#file_button1').click();
            })
            $('#file_button1').change(function(e) {
                // var oldSrc = coverimg.attr('src');
                var _files = this.files[0];
                var r = new FileReader();
                r.readAsDataURL(_files);
                $(r).load(function() {
                    coverimg1.attr('src',this.result);
                    var data = new FormData();
                    var ect = (_files).name.split('.')[1];
                    data.append("modal_file", _files);
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: "/doUploadimg",
                        data: data,
                        contentType: false,
                        processData: false
                    }).done(function(data, status) {
                        console.log('上传成功');
                        coverimg1.attr('src',"/img/uploadimg/"+data.src);  
                    }).fail(function(err) {
                        console.log('上传失败');
                    })
                })
            })
            var coverimg2 = $("#coverimg2");
            $("#file_a").on("click", function(){
                $('#file_button2').click();
            })
            $('#file_button2').change(function(e) {
                // var oldSrc = coverimg.attr('src');
                var _files = this.files[0];
                var r = new FileReader();
                r.readAsDataURL(_files);
                $(r).load(function() {
                    coverimg2.attr('src',this.result);
                    var data = new FormData();
                    var ect = (_files).name.split('.')[1];
                    data.append("modal_file", _files);
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: "/doUploadimg",
                        data: data,
                        contentType: false,
                        processData: false
                    }).done(function(data, status) {
                        console.log('上传成功');
                        coverimg2.attr('src',"/img/uploadimg/"+data.src);  
                    }).fail(function(err) {
                        console.log('上传失败');
                    })
                })
            })
})
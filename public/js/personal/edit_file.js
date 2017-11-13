    var cropper;
    function init(){
        cropper = new ImageCropper(168, 168, 96, 96);
        cropper.setCanvas("cropper");
        cropper.addPreview("preview96");

        if(!cropper.isAvaiable()){
            alert("对不起, 您的浏览器不支持当前功能,请使用 Firefox3.6以上或 Chrome10以上的浏览器");
        }
    }

    function selectImage(fileList,file){
        $("#preview168").css("display","none");
        cropper.loadImage(fileList[0],file);

        $('#selectBtn').html('重新上传');
        $("#saveBtn").css("background-color" , "#1DC6BC");
        $("#saveBtn").attr("disabled",false);
    }

    //保存
    function saveImage(){
        var imgData = cropper.getCroppedImageData(96, 96);
        var url = contextPath + "/api/employee/upload/file";
        $("#file").val(imgData.slice(22,imgData.length));
        var vFD = new FormData(document.getElementById('file_form'));
        var oXHR = new XMLHttpRequest();
        oXHR.addEventListener('load', function(e) {
            var response = e.target.responseText;
            var data = JSON.parse(response);
            //成功
            if (data.error_code == '0') {
            	$("#header_image_url").attr('src',data.img_url);
            	$.post(contextPath+'/personal/file/cookie',function(data){
        		});
                var h = $(window).height();
                $("#delS").css({
                    'height' : h + 'px',
                    'display' : 'block'
                });
            } else {
                alert(data.error_msg);
            }

        }, false);
        oXHR.addEventListener('error', function(e) {
            alert("输入参数异常");
            return;
        }, false);
        oXHR.addEventListener('abort', function() {
        }, false);
        oXHR.open('POST', url);
        oXHR.send(vFD);
    }

    function close_Prom(){
        $('#delSBtn').click(function(){
            $("#delS").css('display' , 'none');
        });
    }

    function canvasImg(){
        var src_168 = $("#image_url_168").val();
        if(src_168 == ""){
            var src168 = $("#personalIcon168").attr("src");
            var src96 = $("#personalIcon96").attr("src");
            draw(src168, src96);
            return;
        }
        var src_96 = $("#image_url_96").val();
        draw(src_168, src_96);
    }

    function draw(src_168,src_96){
        var c_168=document.getElementById("preview168");
        var c_96=document.getElementById("preview96");
        var ctx_168 = c_168.getContext("2d");
        var ctx_96 = c_96.getContext("2d");
        var img_168 = new Image();
        var img_96 = new Image();
        img_168.src = src_168;
        img_96.src = src_96;
        img_168.onload = function() {
            ctx_168.drawImage(img_168, 0, 0);
        };
        img_96.onload = function() {
            ctx_96.drawImage(img_96, 0, 0);
        }
    }


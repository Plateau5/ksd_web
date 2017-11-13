
/*
   url    接口地址
   vFD    表单id
   location_url     成功后跳转地址   不跳转时传0
   callback         成功后刷新本地页面  不刷新时传0
*/

function send_form(url,vFD,location_url,callback,error_callback){
    var oXHR = new XMLHttpRequest();
    oXHR.addEventListener('load', function(e) {
        var response = e.target.responseText;
        var data = JSON.parse(response);
        //成功
        if (data.error_code == '0') {
            if(callback == '0'){
                window.location.href = location_url;
            }else{
                window.location.reload();
            }

        } else {
            alert(data.error_msg);
            error_callback && error_callback();
        }

    }, false);
    oXHR.addEventListener('error', function(e) {
        alert("输入参数异常");
        error_callback && error_callback();
        return;
    }, false);
    oXHR.addEventListener('abort', function() {}, false);
    oXHR.open('POST', url);
    oXHR.send(vFD);
}
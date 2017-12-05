<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>
<%
String contextPath = request.getContextPath();
request.setAttribute("contextPath", contextPath);
%>
<script type="text/javascript">
	var contextPath = '';
</script>  
<script type="text/javascript" src="{{markUri}}/static/js/common/jquery-1.11.3.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<title>Insert title here</title>  
<script type="text/javascript">
$(function(){
	$('#create_sub').click(function(){
	    $('#create_sub').attr('disabled',true);
	    var url = contextPath + "/api/upload";
	    var vFD = new FormData(document.getElementById('jasldjld'));
	    send_form(url,vFD,0);
	});
});
function send_form(url,vFD,callback){
    var oXHR = new XMLHttpRequest();
    oXHR.addEventListener('load', function(e) {
        var response = e.target.responseText;
        var data = JSON.parse(response);
        //成功
        if (data.error_code == '0') {
            alert('success');
            window.location.reload();
        } else {
            alert(data.error_msg);
            $('#create_sub').attr('disabled',false);
        }

    }, false);
    oXHR.addEventListener('error', function(e) {
        alert("输入参数异常");
        return;
    }, false);
    oXHR.addEventListener('abort', function() {}, false);
    oXHR.open('POST', url);
    oXHR.send(vFD);
}
</script>  
</head>  
<body>      
    <form id="jasldjld" name="userForm2" action="{{markUri}}/file/upload2" enctype="multipart/form-data" method="post"">
        <div id="newUpload2">  
            <input type="file" name="file">  
        </div>  
        <input type="button" id="create_sub" value="上传" >  
    </form>   
</body>  
</html>  
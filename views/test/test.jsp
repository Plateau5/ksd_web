<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="per" uri="com/mvc/web/common/tag/permissionTag"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
<%
String contextPath = request.getContextPath();
request.setAttribute("contextPath", contextPath);
%>
<script type="text/javascript">
	var contextPath = '';
</script>
    <title>机构管理</title>
    <script type="text/javascript" src="{{markUri}}/static/js/common/jquery-1.11.3.js"></script>
</head>
<body>
cid:<input name="cid" id="cid" width="200px"><br>
appId:<input name="appId" id="appId" width="200px" value="iT1jNA5YF47k0tZcitglm9"><br>
appKey:<input name="appKey" id="appKey" width="200px" value="NN6HinJail73uhWQFcGM41"><br>
masterSecret:<input name="masterSecret" id="masterSecret" width="200px" value="hWUINF1y6l9IMqyzIpq9iA"><br>
<textarea id="content" name="content" style="margin: 0px; width: 464px; height: 217px;" cols="50" >{"data":"{'detail': '* 【销售】查看金融产品列表\r\n* 【销售】基于金融产品建设销售进件合同流程\r\n* 【销售】基于条件（例如贷款利率，贷款金额等要素）快速筛选出匹配客户的金融产品\r\n* 【销售】收到新产品上架通知，进行了解和学习\r\n* 【系统】1.1版本临时功能增加和bug修复','error_code': 0,'error_msg': 'success','force_update': 1,'request_id': 1478604667032,'url': 'http://api.zhihjf.com/apk/download/financer_v1.3.0.apk','version': '1.3.0','version_code': 1300}","description":"具体的信息内容","title":"测试数据升级","type":2}</textarea>
<br>
<input type="button" id="submit" value="提交">
</body>
<script type="text/javascript">
	$(function($){
		$('#submit').click(function(){
			var url = contextPath+"/api/test/push";
			var cid = $('#cid').val();
			var appId = $('#appId').val();
			var appKey = $('#appKey').val();
			var masterSecret = $('#masterSecret').val();
			var content = $('#content').val();
			$.post(url,{cid:cid,appId:appId,appKey:appKey,masterSecret:masterSecret,content:content},function(data){
				if(data.result == 'ok'){
					alert('成功');
				}
			});
		});
	});
</script>

</html>




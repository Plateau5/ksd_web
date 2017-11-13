$(function(){
	$("input[class='password_new']").keyup(function(){
		var val = $(this).val();
		var id  = $(this).attr('id');
		var new_pwd = $("#new_pwd").val();
		var sub_pwd = $("#sub_pwd").val();
		if(!val){
			$("#error_"+id).html("不能为空");
			$("#reset_pwd").attr("disabled",true);
			return false;
		}else if(val.length <6 || val.length >16){
			$("#error_"+id).html("请输入6-16位密码");
			$("#reset_pwd").attr("disabled",true);
			return false;
		}else{
			$("#error_"+id).html("");
		}
		
		if(id == "sub_pwd" && new_pwd != sub_pwd){
			$("#error_"+id).html("与新密码不一致");
			$("#reset_pwd").attr("disabled",true);
			return false;
		}else{
			$("#error_sub_pwd").html("");
			$("#error_new_pwd").html("");
		}
		if(id == "new_pwd" && sub_pwd && new_pwd != sub_pwd){
			$("#error_"+id).html("与确认密码不一致");
			$("#reset_pwd").attr("disabled",true);
			return false;
		}else{
			$("#error_sub_pwd").html("");
			$("#error_new_pwd").html("");
		}
		if(new_pwd && sub_pwd && new_pwd == sub_pwd){
			$("#reset_pwd").attr("disabled",false);
		}
    });
	
	
	$("#reset_pwd").click(function(){
		var url = contextPath + "/api/employee/resetpassword";
		var new_pwd = $("#new_pwd").val();
		var sub_pwd = $("#sub_pwd").val();
		$.post(url,{sub_pwd:sub_pwd,new_pwd:new_pwd},function(data){
			if(data.error_code == '0'){
				window.location.href=contextPath + "/home";
			}else{
				$("#error_sub_pwd").html(data.error_msg);
			}
		});
	});
});
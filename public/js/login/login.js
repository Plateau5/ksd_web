$(function(){

	var error_msg = $("#error_msg").val();
	if(error_msg != null && error_msg != ''){
		error();
		$(".error").html(error_msg);
	}
	
	$("#login_submit").click(function(){
		var reg= /^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]){2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT|cn|CN$/;
		var account = $("#login_userName").val();
		var password = $("#login_passWord").val();
		if(!account){
			error();
			$(".logo_form").css("marginTop","-20px");
			$(".error").html("邮箱不能为空");
			return;
		}
        if(!reg.test(account)){
        	error();
			$(".logo_form").css("marginTop","-20px");
			$(".error").html("邮箱格式错误");
			return;
        }
		if(!password){
			error();
			$(".logo_form").css("marginTop","-20px");
			$(".error").html("密码不能为空");
			return;
		}
		$("#logoForm").submit();
	});

    function error(){
        $(".error").css("display","block");
    }


	$(function() {
		$("#logoForm input").not("input[type='submit']").keypress(function(e) {
			if (e.which == 13) // 判断所按是否回车键
				{
					var inputs = $("#logoForm").find("input"); // 获取表单中的所有输入框
					var idx = inputs.index(this); // 获取当前焦点输入框所处的位置
					if (idx == inputs.length - 1) // 判断是否是最后一个输入框
					{
						 $('#login_submit').click();
					}else {
							inputs[idx + 1].focus(); // 设置焦点
					}
					return false;// 取消默认的提交行为
				}
		});
	});
    //忘记密码
    $("#forget_btn").click(function(){
    	window.location.href = contextPath + "/forgetPassword";
    });

});
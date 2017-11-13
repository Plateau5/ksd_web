$(function() {

	$("#login_button").click(function() {
		window.location.href = contextPath + "/";
	});
	// 获取验证码
	$("#retrievepassword").click(function() {
		var phone = $("#phone").val();
		if (!phone) {
			$(".proProm1").css("display", "block");
			$(".proProm1 span").html("请输入手机号");
			return;
		} else {
			$(".proProm1").css("display", "none");
		}
		// 校验手机号格式
		var rex = /^1[3|4|5|8]\d{9}$/;
		if (rex.test(phone) == false) {
			$(".proProm1").css("display", "block");
			$(".proProm1 span").html("请输入正确的手机号");
			return;
		} else {
			$(".proProm1").css("display", "none");
		}
		var url = contextPath + "/api/retrievepassword";
		$.post(url, {
			phone : phone
		}, function(data) {
			if (data.error_code != '0') {
				$(".proProm1").css("display", "block");
				$(".proProm1 span").html(data.error_msg);
			} else {
				$("#retrievepassword").css("display", "none");
				$("#count1").css("display", "block");
				count();
				$("#phone").attr("readonly", true);
			}
		});
	});

	// 下一步
	$("#next_step").click(function() {
		var phone = $("#phone").val();
		if (!phone) {
			$(".proProm1").css("display", "block");
			$(".proProm1 span").html("请输入手机号");
			return;
		}
		// 校验手机号格式
		var rex = /^1[3|4|5|8|7]\d{9}$/;
		if (rex.test(phone) == false) {
			$(".proProm1").css("display", "block");
			$(".proProm1 span").html("请输入正确的手机号");
			return;
		}
		var verify_code = $("#verify_code").val();
		if (!verify_code) {
			$(".proProm1").css("display", "block");
			$(".proProm1 span").html("请输入验证码");
			return;
		}
		var rex_code = /^[0-9]{4}$/;
		if (rex_code.test(verify_code) == false) {
			$(".proProm1").css("display", "block");
			$(".proProm1 span").html("请输入正确格式的验证码");
			return;
		}
		// 验证验证码的准确性

		var url = contextPath + "/api/validatecode";
		$.post(url, {
			phone : phone,
			verify_code : verify_code
		}, function(data) {
			if (data.error_code != '0') {
				$(".proProm1").css("display", "block");
				$(".proProm1 span").html(data.error_msg);
			} else {
				// //alert("进入下一步页面");
				var uid = data.uid;
				$("#uid").val(uid);
				var mW = ($(".proD").width()) / 2;
				$(".proMask").css({
					"width" : mW + "px",
					"background" : "#1DC6BC",
					"right" : "46%"
				});
				$(".formFirst").css("display", "none");
				$(".formSecode").css("display", "block");
				$(".formThird").css("display", "none");
				$(".proS").css("background", "#1DC6BC");
			}
		});
	});

	$("#next_step").hover(function() {
		$(this).css("background", "#0B9C94");
	}, function() {
		$(this).css("background", "#1DC6BC");
	});

	$("input[type='password']").keyup(function() {
		var val = $(this).val();
		var id = $(this).attr('id');
		var new_pwd = $("#new_pwd").val();
		var sub_pwd = $("#sub_pwd").val();
		if (!val) {
			$("#error_" + id).html("不能为空");
			$("#reset_pwd").attr("disabled", true);
			return false;
		} else if (val.length < 6 || val.length > 16) {
			$("#error_" + id).html("请输入6-16位密码");
			$("#reset_pwd").attr("disabled", true);
			return false;
		} else {
			$("#error_" + id).html("");
		}

		if (id == "sub_pwd" && new_pwd != sub_pwd) {
			$("#error_" + id).html("与新密码不一致");
			$("#reset_pwd").attr("disabled", true);
			return false;
		} else {
			$("#error_sub_pwd").html("");
			$("#error_new_pwd").html("");
		}
		if (id == "new_pwd" && sub_pwd && new_pwd != sub_pwd) {
			$("#error_" + id).html("与确认密码不一致");
			$("#reset_pwd").attr("disabled", true);
			return false;
		} else {
			$("#error_sub_pwd").html("");
			$("#error_new_pwd").html("");
		}
		if(new_pwd && sub_pwd && new_pwd == sub_pwd){
			$("#reset_pwd").attr("disabled",false);
		}
	});

	// 提交
	$("#reset_pwd").click(function(e) {
		e.preventDefault();
		var url = contextPath + "/api/resetpassword";
		var new_pwd = $("#new_pwd").val();
		var sub_pwd = $("#sub_pwd").val();
		var uid = $("#uid").val();
		$.post(url, {
			sub_pwd : $.md5(sub_pwd),
			new_pwd : $.md5(new_pwd),
			uid : uid
		}, function(data) {
			if (data.error_code == '0') {
				// alert("密码修改成功，请重新登录！");
				var mW = $(".proD").width();
				$(".proMask").css({
					"width" : mW + "px",
					"background" : "#1DC6BC",
					"right" : "21%"
				});
				$(".formFirst").css("display", "none");
				$(".formSecode").css("display", "none");
				$(".formThird").css("display", "block");
				$(".proS").css("background", "#1DC6BC");
				$(".proT").css("background", "#1DC6BC");
				countLogin();
			} else {
				$("#error_sub_pwd").html(data.error_msg);
			}
		});
	});

	// 返回登录
	$("#back_login").click(function() {
		window.location.href = contextPath + "/";
	})

});

function count() {
	var n = 119;
	var t = setInterval(function() {
		$("#count1 span").html(n);
		n--;
		if (n == "-1") {
			clearInterval(t);
			$("#count1").css("display", "none");
			$("#retrievepassword").css("display", "block");
		}
	}, 1000);
}

function countLogin() {
	var n = 2;
	var t = setInterval(function() {
		n--;
		if (n == "-1") {
			clearInterval(t);
			window.location.href = contextPath + "/";
		}
	}, 1000);
}



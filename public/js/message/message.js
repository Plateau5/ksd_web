$(function(){



	$(".callback_msg").off("click").on("click", function () {
		var t = $(this);
		var msg_id = t.attr('lang');
		var url    = contextPath + $(this).attr('alt');
		var rUrl    = contextPath + "/api/message/callBack";
		var financeId = $.trim($(this).attr("financeId"));
		var form = $("#message_to_detail");
		var status = t.attr('status');
		form.find("#finance_id").val(financeId);
		form.attr("action", url);
		if (t.hasClass("all_message")) {
			if(status && status == '1'){
				return;
			} else {
				$.post(rUrl, {msg_id:msg_id}, function(datas){
					var data = eval(datas);
					if(data.error_code == '0'){
						window.location.reload();
					}else{
						alert(data.error_msg);
					}
				});
			}
		} else {
			if (url != "" && url != null) {
				form.submit();
			} else {
				window.location.reload();
			}
		}
	});
	var dH=$("body").height();
	var wH=$(window).height();
	if(dH<wH){
		$("no_message").css("height",wH+"px");
	}else{
		$("no_message").css("height",dH+"px");
	}


	var length = $(".messageTr").length;
	$(".messageTr").eq(length - 1).removeClass("message_clean_bottom");

	for(var i = 0; i < length; i++){
		var messageCon2 = $(".messageTr").eq(i).find('.messageCon2').length;
		if(messageCon2 > 0){
			$(".messageTr").eq(i).css('height','110px');
			$('.messageCon2').parent().next().css('top','52px');
		}else{
			$(".messageTr").eq(i).css('height','85px');
			$('.messageCon2').parent().next().css('top','44px');
		}
	}

});
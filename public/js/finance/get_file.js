$(function(){
	$(".getFile .list_item_detail,.getFile").off("click").on("click", function(){
		var targetName = $(this)[0].tagName;
		if (targetName.toLowerCase() != 'div') {
			var finance_id = $(this).attr('lang');
		} else {
			var finance_id = $(this).parents(".getFile").attr('lang');
		}
		var active = $(this).attr('alt');
		var url = $(this).attr('url');
		var navigation = $(this).attr('navigation');
		var width = screen.width;
		var height = screen.height;
		var local_url = LOCALURL;
		local_url && $("#getFile").append("<input type='hidden' value='"+ local_url +"' name='url' />");
		$("#thumbnail").val("@"+width+"w_"+height+"h"+"_100q.jpg");
		$("#finance_id_file").val(finance_id);
		$("#active").val(active);
		$("#url").val(url);
		$("#navigation").val(navigation);
		$("#getFile").submit();
	});
	$(".getHis").off("click").on("click", function(){
		var finance_id = $(this).attr('lang');
		var url = $(this).attr('url');
		var navigation = $(this).attr('navigation');
		$("#finance_id_his").val(finance_id);
		$("#url_his").val(url);
		$("#navigation_his").val(navigation);
		$("#getHis").submit();
	});

	/**
	 * 列表页跳转详情页公用方法
	 *
	 *
	 */
	function toOrderDetail () {
		var input = $("#financeId");
		var form = $("#to_order_detail");
		var orderList = $(".getFiles .list_item_detail");
		var url = LOCALURL;
		url && form.append("<input type='hidden' value='"+ url +"' name='url' />");
		orderList.each(function () {
			var currentOrder = $(this);
			currentOrder.off("click").on("click", function () {
				var t = $(this);
				var financeId = $.trim(t.parents(".getFiles").attr("lang"));
				input.val(financeId);
				form.submit();
			});
		});
	}
	toOrderDetail();
});